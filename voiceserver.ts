import { Socket } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

import http from 'http'
import { Server } from 'socket.io'
import { PrismaClient, FriendRequest as DBFriendRequest } from "@prisma/client";
import * as dotenv from 'dotenv';
import { AllowedTypes, AudioSlice, ClientResponsePacket, EditContext, Message, PendingFriendRequest, SocketData, SocketInformationType, User, VoiceChatInformation, WritingEvent } from "@/app/app/utils/socket_utils";

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

try {
    io.on("connection", (socket: Socket) => {
        if (!socket.handshake.query.info) {
            console.log("No user info, refused", socket.id);
            socket.disconnect();
            return;
        }

        if (!socket.handshake.query.vc || typeof (socket.handshake.query.vc) !== "string") {
            console.log("No vc, refused", socket.id);
            socket.disconnect();
            return;
        }

        console.log("User connected", socket.id, socket.handshake.query.info);
        const userINFO = (typeof socket.handshake.query.info === 'string' ? socket.handshake.query.info : '').split(",");
        const userID = userINFO[0];
        const userNAME = userINFO[1];
        const userAVATAR = userINFO[2];
        const userUSER: User = {
            id: userID,
            username: userNAME,
            avatarUrl: userAVATAR,
        }
        const voiceChannelID = socket.handshake.query.vc;
        socket.join(voiceChannelID);

        socket.on("audio_stream", (audioData: any) => {
            console.log("Audio data received", audioData);

            const audioSlice: AudioSlice = {
                data: audioData,
                speaker: userUSER,
            }

            io.to(voiceChannelID).emit("audio_stream", audioSlice);
        });

        socket.on("vc_join", (vc: VoiceChatInformation, user: User) => { io.to(voiceChannelID).emit("vc_update", "join", userUSER); });
        socket.on("vc_leave", (vc: VoiceChatInformation, user: User) => { io.to(voiceChannelID).emit("vc_update", "leave", userUSER); });

        socket.on("disconnect", async () => {
            console.log("User disconnected", socket.id);
            try {

                await db.voiceChat.update({
                    where: {
                        channelId: voiceChannelID
                    },
                    data: {
                        members: {
                            disconnect: {
                                id: userID
                            }
                        }
                    }
                });
            } catch (err) { }
            io.to(voiceChannelID).emit("vc_update", "leave", userUSER);
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