import { Socket } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

import { createWorker, types as mediasoupTypes } from "mediasoup";

import http from 'http'
import { Server } from 'socket.io'
import * as dotenv from 'dotenv';
import { User } from "@/app/app/utils/socket_utils";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: '.env.local' }); // Change if its .env for you

const redisClient = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
const redisSubClient = redisClient.duplicate();

await Promise.all([
    redisClient.connect(),
    redisSubClient.connect()
]);

const httpServer = http.createServer()

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
    adapter: createAdapter(redisClient, redisSubClient)
})

const db = new PrismaClient({
    datasourceUrl: process.env.DB_URL
});

let worker: mediasoupTypes.Worker;
let router: mediasoupTypes.Router;

const mediaCodecs: mediasoupTypes.RtpCodecCapability[] = [
  {
    kind: "audio",
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
];

async function setupMediasoup() {
  worker = await createWorker();
  router = await worker.createRouter({ mediaCodecs });
}

setupMediasoup();

async function createWebRtcTransport(): Promise<{
  transport: mediasoupTypes.WebRtcTransport;
  params: {
    id: string;
    iceParameters: mediasoupTypes.IceParameters;
    iceCandidates: mediasoupTypes.IceCandidate[];
    dtlsParameters: mediasoupTypes.DtlsParameters;
  };
}> {
  const transport = await router.createWebRtcTransport({
    listenIps: [{ ip: "127.0.0.1", announcedIp: undefined }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  });

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
}


    const transports = new Map<string, mediasoupTypes.WebRtcTransport>();
    const producers = new Map<string, mediasoupTypes.Producer[]>();
    const consumers = new Map<string, mediasoupTypes.Consumer[]>();


try {

    io.on("connection", (socket: Socket) => {
  if (!socket.handshake.query.info) {
    console.log("No user info, refused", socket.id);
    socket.disconnect();
    return;
  }

  console.log("User connected", socket.id, socket.handshake.query.info);
  const userINFO = (typeof socket.handshake.query.info === "string" ? socket.handshake.query.info : "").split(",");
  const userID = userINFO[0];
  const userNAME = userINFO[1];
  const userAVATAR = userINFO[2];
  const userUSER: User = {
    id: userID,
    username: userNAME,
    avatarUrl: userAVATAR,
  };
  const voiceChannelID = socket.handshake.query.vc;
  socket.join(userID);

  socket.on("getRouterRtpCapabilities", (_, callback) => {
    callback(router.rtpCapabilities);
  });

  socket.on("createTransport", async (_, callback) => {
    const { transport, params } = await createWebRtcTransport();
    transports.set(socket.id, transport);
    callback(params);
  });

  socket.on(
    "connectTransport",
    async (
      { dtlsParameters }: { dtlsParameters: mediasoupTypes.DtlsParameters },
      callback: () => void
    ) => {
      try {
        const transport = transports.get(socket.id);
        if (!transport) throw new Error("Transport not found for this socket");

        await transport.connect({ dtlsParameters });

        callback(); // DTLS connected
      } catch (err) {
        console.error("Error connecting transport:", err);
      }
    }
  );

  socket.on("produce", async (producerData, callback) => {
    try {
      const transport = transports.get(socket.id);
      if (!transport) throw new Error("No transport for socket");

      const producer = await transport.produce(producerData);

      let userProducers = producers.get(socket.id) || [];
      userProducers.push(producer);
      producers.set(socket.id, userProducers);

      socket.broadcast.emit("newProducer", { producerId: producer.id });

      callback({ id: producer.id });

      // Cleanup on close
      producer.on("@close", () => {
        const userProds = producers.get(socket.id);
        if (!userProds) return;
        producers.set(
          socket.id,
          userProds.filter((p) => p.id !== producer.id)
        );
      });
    } catch (err) {
      console.error("Produce error:", err);
    }
  });

  socket.on(
    "consume",
    async (
      { producerId, rtpCapabilities },
      callback
    ) => {
      try {
        const transport = transports.get(socket.id);
        if (!transport) throw new Error("Transport not found");

        const canConsume = router.canConsume({
          producerId,
          rtpCapabilities,
        });
        if (!canConsume) {
          callback(null);
          return;
        }

        const consumer = await transport.consume({
          producerId,
          rtpCapabilities,
          paused: false,
        });

        callback({
          id: consumer.id,
          producerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });

        let userConsumers = consumers.get(socket.id) || [];
        userConsumers.push(consumer);
        consumers.set(socket.id, userConsumers);

        // Cleanup on close
        consumer.on("@close", () => {
          const userCons = consumers.get(socket.id);
          if (!userCons) return;
          consumers.set(
            socket.id,
            userCons.filter((c) => c.id !== consumer.id)
          );
        });
      } catch (err) {
        console.error("Consume error:", err);
        callback(null);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    const transport = transports.get(socket.id);
    if (transport) {
      transport.close();
      transports.delete(socket.id);
    }

    const userProducers = producers.get(socket.id);
    if (userProducers) {
      userProducers.forEach((producer) => producer.close());
      producers.delete(socket.id);
    }

    const userConsumers = consumers.get(socket.id);
    if (userConsumers) {
      userConsumers.forEach((consumer) => consumer.close());
      consumers.delete(socket.id);
    }
  });
});


    const PORT = 3002;
    httpServer.listen(PORT, () => {
        console.log(`Socket.io server is running on port ${PORT}`)
    })

    httpServer.on('close', async () => {
        await db.$disconnect();
    });
} catch (err) {
    if (err instanceof Error) {
        console.log("Name: ", err.name);
        console.log("Message: ", err.message);
        console.log("Stack: \n", err.stack);
    }
}