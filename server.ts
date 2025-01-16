import { Socket } from "socket.io";

import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import * as dotenv from 'dotenv';
import { useUser } from "@clerk/nextjs";
import { AllowedTypes, ClientResponsePacket, EditContext, Message, SocketData, SocketInformationType } from "@/app/app/utils/utils";

dotenv.config({ path: '.env.local' }); // Change if its .env for you

const httpServer = http.createServer()

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
                                repliedToId: message.repliedTo?.id?.toString(),
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
                                ...message,
                                id: sentMsg.id.toString(),
                            }
                        }
                        io.to(message.channel.id).emit("message", response);
                        console.log("Sending message to", message.channel.id, " by ", socket.id);
                    } catch (err) {
                        if (err instanceof Error)
                            console.error(err.stack);
                    }
                }
                break;

            default:
                break;
        }
    });

    socket.on("delete_message", async (data: SocketData) => {
        const message = data.data as Message;
        io.to(message.channel.id).emit("delete_message", message);
        console.log("Delete message "+data.data.id+" by ", socket.id);
    });

    socket.on("edit_message", async (data: SocketData) => {
        const edit = data.data as EditContext;
        io.to(edit.newMessage.channel.id).emit("edit_message", edit)
    })

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