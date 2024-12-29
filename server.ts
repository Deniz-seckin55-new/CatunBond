import { Socket } from "socket.io";

import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Change if its .env for you

const httpServer = http.createServer()

interface Message {
    id: bigint | null;
    content: string;
    timestamp: Date;
    authorId: string;
    channelId: string;
    repliedTo: string | null;
    authorUsername: string | null;
}

enum SocketInformationType {
    ClientSendMessage
}

enum AllowedTypes {
    Message
}

interface SocketData {
    infoType: SocketInformationType,
    dataType: AllowedTypes,
    data: any
}

interface MessageSocketPacket {
    Message: Message;
}

interface ClientResponsePacket {
    dataType: AllowedTypes,
    data: any
}

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
})
const db = new PrismaClient({
    datasourceUrl: process.env.DB_URL
});

io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    socket.on("message", async (data: SocketData) => {
        switch (data.infoType) {
            case SocketInformationType.ClientSendMessage:
                if (data.dataType == AllowedTypes.Message) {
                    const message = data.data as Message;
                    const sentMsg = await db.messages.create({
                        data: {
                            content: message.content,
                            timestamp: message.timestamp,
                            repliedToId: message.repliedTo ?? 'none',
                            author: {
                                connectOrCreate: {
                                    create: {
                                        id: message.authorId,
                                        username: message.authorUsername ?? 'Not found',
                                    },
                                    where: {
                                        id: message.authorId
                                    }
                                } 
                            },
                            channel: {
                                connect: {
                                    id: message.channelId
                                }
                            }
                        }
                    })
                    const response: ClientResponsePacket = {
                        dataType: AllowedTypes.Message,
                        data: {
                            ...sentMsg,
                            id: sentMsg.id.toString(),
                            authorUsername: message.authorUsername, 
                        }
                    }
                    io.to(message.channelId).emit("message", response);
                    console.log("Sending message to", message.channelId, " by ", socket.id);
                }
                break;

            default:
                break;
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    socket.on("joinChannel", (channelId: any) => {
        console.log("User joined channel", channelId, " ", socket.id);
        socket.join(channelId);
    });

    socket.on("leaveChannel", (channelId: any) => {
        console.log("User left channel", channelId, " ", socket.id);
        socket.leave(channelId);
    });
});

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`)
})

httpServer.on('close', async () => {
    await db.$disconnect();
});