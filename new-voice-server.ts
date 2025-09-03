import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import * as mediasoup from "mediasoup";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", methods: ["GET", "POST"],
    credentials: true,
  }
});

const mediaCodecs: mediasoup.types.RtpCodecCapability[] = [
  {
    kind: "audio" as const,
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video" as const,
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: {},
  },
];

const rooms = new Map();

/** Room & Peer types */
type Room = {
  router: mediasoup.types.Router;
  peers: Map<string, Peer>;
};

type Peer = {
  socket: any;
  transports: mediasoup.types.WebRtcTransport[];
  producers: mediasoup.types.Producer[];
  consumers: mediasoup.types.Consumer[];
};

io.on("connection", async (socket) => {

  const clientId: string | undefined = socket.handshake.query.id as (string | undefined);

  if (!clientId) {
    console.error("Client ID is required");
    socket.disconnect();
    return;
  }

  console.log(`Client connected: ${clientId}`);

  socket.on("joinRoom", async ({ roomId }, callback) => {
    let room = rooms.get(roomId);

    console.log(`Client ${clientId} joining room: ${roomId}`);

    if (!room) {
      const worker = await mediasoup.createWorker();
      const router = await worker.createRouter({ mediaCodecs });
      room = { router, peers: new Map() };
      rooms.set(roomId, room);
    }

    room.peers.set(clientId, {
      socket,
      transports: [],
      producers: [],
      consumers: [],
    });

    socket.join(roomId);
    callback(room.router.rtpCapabilities);
  });

  socket.on("createWebRtcTransport", async (_, callback) => {
    const room = findRoomBySocketId(clientId);

    if (!room) {
      console.error(`Room not found for client: ${clientId}`);
      return callback({ error: "Room not found" });
    }

    const { router } = room;

    console.log(`Creating WebRTC transport for client: ${clientId} in room: ${room.router.id}`);

    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: "0.0.0.0", announcedIp: "192.168.1.110" }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true
    });

    transport.on("dtlsstatechange", (state: mediasoup.types.DtlsState) => {
      if (state === "closed") transport.close();
    });

    if (!room.peers.get(clientId))
      room.peers.set(clientId, { socket, transports: [], producers: [], consumers: [] });

    room.peers.get(clientId)!.transports.push(transport);

    callback({
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    });
  });

  socket.on("connectTransport", async ({ transportId, dtlsParameters }, callback) => {
    const transport = findTransport(clientId, transportId);

    console.log(`Connecting transport for client: ${clientId}, transport ID: ${transportId}`);

    if (transport)
      await transport.connect({ dtlsParameters });
    else
      console.warn(`Transport not found for ID: ${transportId} on socket: ${clientId} on connectTransport`);
    callback();
  });

  socket.on("produce", async ({ transportId, kind, rtpParameters }, callback) => {
    const peer = findPeer(clientId);

    console.log(`Producing for client: ${clientId}, transport ID: ${transportId}, kind: ${kind}`);

    if (!peer) {
      console.warn(`Peer not found for socket: ${clientId} on produce`);
      return callback({ error: "Peer not found" });
    }

    const transport = peer.transports.find(t => t.id === transportId);

    if (!transport) {
      console.warn(`Transport not found for ID: ${transportId} on socket: ${clientId} on produce`);
      return callback({ error: "Transport not found" });
    }

    const producer = await transport.produce({ kind, rtpParameters });
    peer.producers.push(producer);

    callback({ id: producer.id });

    const room = findRoomBySocketId(clientId);

    if (!room) {
      console.error(`Room not found for client: ${clientId} on produce`);
      return;
    }

    for (const [otherId, otherPeer] of room.peers.entries()) {
      if (otherId === clientId) continue;

      const recvTransport = otherPeer.transports.find(t => t.appData?.direction === "recv");
      if (!recvTransport) continue;

      socket.to(otherId).emit("newProducer", {
        producerId: producer.id,
        kind: producer.kind,
        userId: clientId,
      });
    }
  });

  socket.on("consume", async ({ rtpCapabilities, producerId }, callback) => {
    const room = findRoomBySocketId(clientId);

    if (!room) {
      console.error(`Room not found for client: ${clientId} on consume`);
      return callback({ error: "Room not found" });
    }

    const peer = room.peers.get(clientId);

    console.log(`Consuming for client: ${clientId}, producer ID: ${producerId}`);

    const router = room.router;
    if (!router.canConsume({ producerId, rtpCapabilities })) {
      return callback({ error: "Can't consume" });
    }

    if (!peer) {
      console.warn(`Peer not found for socket: ${clientId} on consume`);
      return callback({ error: "Peer not found" });
    }

    const transport = peer.transports.find(t => t.appData?.direction === "recv");

    if (!transport) {
      console.warn(`Transport not found for socket: ${clientId} on consume`);
      return callback({ error: "Transport not found" });
    }

    const consumer = await transport.consume({
      producerId,
      rtpCapabilities,
      paused: false,
    });

    peer.consumers.push(consumer);

    callback({
      id: consumer.id,
      producerId,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
    });
  });

  socket.on("leave", () => cleanup(clientId));
  socket.on("disconnect", () => cleanup(clientId));
});

/** ========== Helpers ========== */

function findRoomBySocketId(socketId: string): Room | undefined {
  for (const room of rooms.values()) {
    if (room.peers.has(socketId)) return room;
  }

  return undefined;
}

function findPeer(socketId: string): Peer | undefined {
  if(!findRoomBySocketId(socketId)) return undefined;

  return findRoomBySocketId(socketId)!.peers.get(socketId);
}

function findTransport(socketId: string, transportId: string): mediasoup.types.WebRtcTransport | undefined {
  const peer = findPeer(socketId);

  if (!peer) return undefined;

  return peer.transports.find(t => t.id === transportId);
}

function cleanup(socketId: string) {
  const room = findRoomBySocketId(socketId);

  if (!room) {
    console.warn(`Room not found for socket: ${socketId} on cleanup`);
    return;
  }

  const peer = room.peers.get(socketId);
  if (!peer) return;

  peer.transports.forEach(t => t.close());
  peer.producers.forEach(p => p.close());
  peer.consumers.forEach(c => c.close());

  room.peers.delete(socketId);
  // Find the roomId for emitting to the correct room
  const roomId = [...rooms.entries()].find(([_, r]) => r === room)?.[0];
  if (roomId) {
    io.to(roomId).emit("peerLeft", { userId: socketId });
  }

  if (room.peers.size === 0) rooms.delete(roomId);
}

/** ========== Start Server ========== */
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🐾 mediasoup server running at http://localhost:${PORT}`);
});