import { ViewingFriendsDiv } from "./utils";
import { FriendRequest as DBFriendRequest } from "@prisma/client";

export interface Server {
    id: string;
    name: string;
    image: string;
}

export interface Channel {
    id: string;
    name: string;
    isDirectMessage: boolean;
}


export interface Message {
    id: bigint | null;
    content: string;
    timestamp: Date;
    channel: Channel;
    repliedTo: Message | null;
    author: User
}

export interface Channel {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string;
}

export interface Friend {
    user: User,
    status: ViewingFriendsDiv
}

export interface PendingFriendRequest {
    friendRequest: DBFriendRequest,
    sender: User,
    reciever: User,
}

export interface DirectMessage {
    id: string,
    name: string,
    users: User[],
}


export interface FriendRequestAnswer {
    friendRequest: DBFriendRequest,
    answer: string,
}

export enum SocketInformationType {
    ClientSendMessage,
    ClientDeleteMessage,
    ClientEditMessage,
    ClientSendFriendRequest,
    ClientCancelFriendRequest,
    ClientAcceptFriendRequest,
    ClientDeclineFriendRequest,
    ClientBlockFriendRequest,
}

export interface EditContext {
    oldMessageid: BigInt | null,
    newMessage: Message,
}

export enum AllowedTypes {
    Message,
    EditContext,
    FriendRequest,
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
