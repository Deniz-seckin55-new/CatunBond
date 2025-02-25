import { Socket } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

import http from 'http'
import { Server } from 'socket.io'
import { PrismaClient, FriendRequest as DBFriendRequest } from "@prisma/client";
import * as dotenv from 'dotenv';
import { AllowedTypes, ClientResponsePacket, EditContext, Message, PendingFriendRequest, SocketData, SocketInformationType, User, WritingEvent } from "@/app/app/utils/socket_utils";

dotenv.config({ path: '.env' }); // Change if its .env for you

console.log("REDIS URL: ", process.env.REDIS_URL);

const redisClient = createClient({ url: process.env.REDIS_URL });
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
        if (!socket.handshake.query.id) {
            console.log("No id, refused", socket.id);
            socket.disconnect();
            return;
        }

        const UserID = socket.handshake.query.id;
        console.log("User connected", socket.id, socket.handshake.query.id);
        socket.join(socket.handshake.query.id);

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
                                    authorId: message.author.id,
                                    channelId: message.channel.id,
                                    repliedToId: message.repliedTo ? message.repliedTo.id : null,
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
            console.log("Delete message " + data.data.id + " by ", socket.id);
        });

        socket.on("edit_message", async (data: SocketData) => {
            const edit = data.data as EditContext;
            io.to(edit.newMessage.channel.id).emit("edit_message", edit)
        })

        socket.on("disconnect", async () => {
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

        socket.on("friend_request_send", (data: SocketData) => {
            console.log("friend_request_send", data.data);
            const friendRequest: PendingFriendRequest = data.data as PendingFriendRequest;
            io.to(friendRequest.reciever.id).emit("friend_request_send", friendRequest);
        });

        socket.on("get_status", (userId: string, fn: any) => {
            if (io.sockets.adapter.rooms.get(userId)) {
                fn("online");
            } else {
                fn("offline");
            }
        });

        socket.on("friend_request_answer", (socketData: SocketData) => {
            console.log("friend_request_answer", socketData);
            const friendRequest = socketData.data as DBFriendRequest;
            switch (socketData.infoType) {
                case SocketInformationType.ClientAcceptFriendRequest:
                    console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "accept" });
                    io.to(friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "accept" });
                    break;
                case SocketInformationType.ClientCancelFriendRequest:
                    break;
                case SocketInformationType.ClientDeclineFriendRequest:
                    console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "decline" });
                    io.to(friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "decline" });
                    break;
                case SocketInformationType.ClientBlockFriendRequest:
                    console.log("emitting to ", friendRequest.senderId, { friendRequest: friendRequest, answer: "block" });
                    io.to(friendRequest.senderId).emit("friend_request_answer", { friendRequest: friendRequest, answer: "block" });
                    break;
                default:
                    break;
            }
        });

        socket.on("writing_event", (data: SocketData) => {
            const event: WritingEvent = data.data as WritingEvent;

            if (data.infoType === SocketInformationType.ClientStartWritingMessage) {
                io.to(event.channelId).emit("writing_event", event.user, "start");
            } else if (data.infoType === SocketInformationType.ClientStopWritingMessage) {
                io.to(event.channelId).emit("writing_event", event.user, "stop");
            }
        });
    });

    const PORT = 3001
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