import { Socket } from "socket.io";

import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Change if its .env for you

const httpServer = http.createServer()

export interface Message {
    id: bigint | null;
    content: string;
    timestamp: Date;
    channel: Channel;
    repliedTo: string | null;
    author: User
}

export interface Channel {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string | null;
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
                    try {

                        const message = data.data as Message;
                        const sentMsg = await db.messages.create({
                            data: {
                                content: message.content,
                                timestamp: message.timestamp,
                                repliedToId: message.repliedTo ?? 'none',
                                author: {
                                    connectOrCreate: {
                                        create: {
                                            id: message.author.id,
                                            username: message.author.username ?? 'Not found',
                                        },
                                        where: {
                                            id: message.author.id
                                        }
                                    }
                                },
                                channel: {
                                    connect: {
                                        id: message.channel.id
                                    }
                                }
                            }
                        });

                        let jsonMessage = {
                            id: sentMsg.id.toString(),
                            content: sentMsg.content,
                            timestamp: sentMsg.timestamp,
                            authorId: sentMsg.authorId,
                            channelId: sentMsg.channelId,
                            repliedTo: sentMsg.repliedToId,
                        }
                        console.log("Sent DB message: " + JSON.stringify(jsonMessage));
                        const response: ClientResponsePacket = {
                            dataType: AllowedTypes.Message,
                            data: {
                                ...sentMsg,
                                id: sentMsg.id.toString(),
                            }
                        }
                        io.to(message.channel.id).emit("message", response);
                        console.log("Sending message to", message.channel.id, " by ", socket.id);
                    } catch (err) {
                        if(err instanceof Error)
                            console.error(err.stack);
                    }
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