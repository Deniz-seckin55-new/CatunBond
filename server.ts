import { Socket } from "socket.io";

const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = http.createServer()

interface Message {
    id: bigint | null;
    content: string;
    timestamp: Date;
    authorId: string;
    channelId: string;
    repliedTo: string | null;
}

enum SocketInformationType {
    ClientSendMessage
}

export enum AllowedTypes {
    Message
}

export interface SocketData {
    infoType: SocketInformationType,
    dataType: AllowedTypes,
    data: any
}

export interface MessageSocketPacket {
    Message: Message;
}

export interface ClientResponsePacket {
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

io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    socket.on("message", (data: SocketData) => {
        switch (data.infoType) {
            case SocketInformationType.ClientSendMessage:
                if(data.dataType == AllowedTypes.Message) {
                    const message = data.data as Message;
                    const response: ClientResponsePacket = {
                        dataType: AllowedTypes.Message,
                        data: message
                    }
                    io.to(message.channelId).emit("message", response);
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
        socket.join(channelId);
    });

    socket.on("leaveChannel", (channelId: any) => {
        socket.leave(channelId);
    });
});

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})
