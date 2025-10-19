import { Socket } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

import http from 'http'
import { Server } from 'socket.io'
import { PrismaClient, FriendRequest as DBFriendRequest } from "@prisma/client";
import * as dotenv from 'dotenv';
import { AllowedTypes, ChannelInfo, ClientResponsePacket, EditContext, Message, MessageCreate, PendingFriendRequest, ReconnectData, SendMessageI, SocketData, SocketInformationType, WritingEvent } from "@/app/app/utils/socket_utils";
import * as schemas from "@/app/app/utils/schemas";

type NextWrapperServer = {
    prepare: () => Promise<void>;
};

import { CreateChannelInfo, CreateMessageI } from "@/app/api/apicallreferences/utils";
import { CreateMessage } from "@/app/api/v1/utils/utils";
import { NextResponse } from "next/server";

dotenv.config({ path: '.env' }); // Change if its .env for you

console.log("REDIS URL: ", process.env.REDIS_URL);

const reconnectStrategy = (retries: number): number | Error => {
    const maxRetries = 10;
    const baseDelay = 500; // increase from 100ms
    const maxDelay = 2000;

    if (retries > maxRetries) {
        return new Error("Too many Redis retry attempts");
    }

    const delay = Math.min(baseDelay * 2 ** retries, maxDelay);
    // optionally only log every few retries
    if (retries % 2 === 0) console.warn(`Redis reconnect attempt ${retries}, waiting ${delay}ms...`);
    return delay;
};

const redisClient = createClient({ url: process.env.REDIS_URL, socket: { reconnectStrategy } });

redisClient.on("error", (err) => console.log("*hiss* Redis error:", err));

await redisClient.connect();

const redisSubClient = redisClient.duplicate();
await redisSubClient.connect();

redisSubClient.on("error", (err) => console.log("*hiss* Redis sub error:", err));

const httpServer = http.createServer()

const io = new Server(httpServer, {
    pingInterval: 10000,
    pingTimeout: 60000,
    cors: {
        origin: '*', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
    adapter: createAdapter(redisClient, redisSubClient)
});

const db = new PrismaClient({
    datasourceUrl: process.env.DB_URL
});

function isUserOnline(userId: string) { return io.sockets.adapter.rooms.get(`USER_${userId}`) };

try {
    io.on("connection", (socket: Socket) => {
        if (!socket.handshake.query.id) {
            console.log("No id, refused", socket.id);
            socket.disconnect();
            return;
        }

        const UserID = Array.isArray(socket.handshake.query.id) ? socket.handshake.query.id.join("") : socket.handshake.query.id;
        if (isUserOnline(UserID)) {
            console.log("Duplicate user ", UserID);
            socket.disconnect();
            return;
        }
        console.log("User connected", socket.id, socket.handshake.query.id);
        socket.join(`USER_${UserID}`);

        socket.on("disconnect", async () => {
            console.log("User disconnected", socket.id);
        });

        socket.on("sendMessage", async (channelId: string, message: MessageCreate, callbackFn: (response: NextResponse<{data: Message}> | NextResponse<{message: string}>) => void) => {
            console.log("Sending new message to ",channelId);

            let result = await CreateMessage(db, channelId, UserID, message);

            callbackFn(result);
        });

        socket.on("joinChannel", (channelId: string) => {
            console.log("User joined channel", channelId, " ", socket.id);
            socket.join(`CHANNEL_${channelId}`);
        });

        socket.on("leaveChannel", (channelId: string) => {
            console.log("User left channel", channelId, " ", socket.id);
            socket.leave(`CHANNEL_${channelId}`);
        });

        // socket.on("friend_request_send", (data: SocketData) => {
        //     console.log("friend_request_send", data.data);
        //     const friendRequest: PendingFriendRequest = data.data as PendingFriendRequest;
        //     io.to(friendRequest.senderId).emit("friend_request_send", friendRequest);
        // });

        socket.on("get_status", (userId: string, fn?: (status: "online" | "offline") => void) => {
            if (io.sockets.adapter.rooms.has("USER_"+userId)) {
                fn?.("online");
            } else {
                fn?.("offline");
            }
        });

        // socket.on("friend_request_answer", (socketData: SocketData) => {
        //     console.log("friend_request_answer", socketData);
        //     const friendRequest = socketData.data as DBFriendRequest;
        //     switch (socketData.infoType) {
        //         case SocketInformationType.ClientAcceptFriendRequest:
        //             console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "accept" });
        //             io.to("USER_"+friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "accept" });
        //             break;
        //         case SocketInformationType.ClientCancelFriendRequest:
        //             break;
        //         case SocketInformationType.ClientDeclineFriendRequest:
        //             console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "decline" });
        //             io.to("USER_"+friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "decline" });
        //             break;
        //         case SocketInformationType.ClientBlockFriendRequest:
        //             console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "block" });
        //             io.to("USER_"+friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "block" });
        //             break;
        //         default:
        //             break;
        //     }
        // });

        socket.on("writing_event", (data: SocketData) => {
            const event: WritingEvent = data.data as WritingEvent;

            if (data.infoType === SocketInformationType.ClientStartWritingMessage) {
                io.to("CHANNEL_"+event.channelId).emit("writing_event", event.user, "start");
            } else if (data.infoType === SocketInformationType.ClientStopWritingMessage) {
                io.to("CHANNEL_"+event.channelId).emit("writing_event", event.user, "stop");
            }
        });

        socket.on("category_channel_order_change", async (serverId: string, data: { id: string, channels: string[] }[]) => {
            console.log("category_channel_order_change ", serverId);

            const onlineUsers = (await db.server.findUnique({ where: { id: serverId }, select: { members: true } }))?.members.filter(member => io.sockets.adapter.rooms.get(member.id) !== undefined);
            onlineUsers?.forEach((user) => {
                io.to("USER_"+user.id).emit("category_channel_order_change", serverId, data);
            });
        });

        socket.on("channel_info_update", (data: ChannelInfo) => {
            io.to("CHANNEL_"+data.channelId)/*.except(UserID)*/.emit("channel_info_update", data);
        })

        socket.on("client_reconnect", async (data: ClientResponsePacket, callbackFn: (response: { newMessagesSentSince: Message[] }) => void) => {
            const reconnect = data.data as ReconnectData;
            const { channelId, lastSeenMessageTimestamp } = reconnect;

            if (!reconnect) return;
            if (!channelId) return;
            if (!lastSeenMessageTimestamp) return;

            console.log("User rejoined channel", reconnect.channelId, " ", socket.id);
            socket.join(channelId);

            const newMessagesSentSince = await db.messages.findMany({
                where: { timestamp: { gt: lastSeenMessageTimestamp } }, orderBy: { timestamp: "asc" },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true
                        }
                    },
                    channel: {
                        select: {
                            id: true,
                            categoryId: true,
                            name: true
                        }
                    },
                    repliedTo: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatarUrl: true
                                }
                            },
                            channel: {
                                select: {
                                    id: true,
                                    categoryId: true,
                                    name: true
                                }
                            },
                            repliedTo: {
                                select: { id: true } // Depth End
                            },
                            reactions: true,
                        },
                    },
                    reactions: true,
                },
            });

            callbackFn({ newMessagesSentSince });
        });
    });

    const PORT = 3001
    httpServer.listen(PORT, '0.0.0.0', () => {
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

process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down…');
    await Promise.all([redisClient.disconnect(), redisSubClient.disconnect()]);
    httpServer.close(() => process.exit(0));
});