import { ViewingFriendsDiv } from "./utils";
import { FriendRequest as DBFriendRequest, Prisma } from "@prisma/client";

export type Server = Prisma.ServerGetPayload<{
    include: {
        channels: {
            select: {
                id: true,
                name: true,
                channelType: true,
            }
        },
        members: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        }
    }
}>;

export type Message = Prisma.MessagesGetPayload<{
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
                        name: true
                    }
                },
                repliedTo: {
                    select: { id: true } // Depth End
                }
            },
        }
    },
}>

export type Channel = Prisma.ChannelGetPayload<{
    select: {
        id: true,
        name: true,
        channelType: true,
    }
}>;

export type User = Prisma.UserGetPayload<{
    select: {
        id: true,
        username: true,
        avatarUrl: true,
    }
}>;

export type DetailedDBUser = Prisma.UserGetPayload<{
    select: {
        id: true,
        friends: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        },
        receivedRequests: {
            include: {
                receiver: true,
                sender: true,
            }
        },
        sentRequests: {
            include: {
                receiver: true,
                sender: true,
            }
        },
        directMsgs: {
            select: {
                id: true,
                directMsgFor: true,
                channelType: true,
            }
        },
        servers: {
            select: {
                channels: {
                    select: {
                        id: true,
                        name: true,
                        channelType: true,
                    }
                }
            }
        },
        username: true,
        avatarUrl: true,
    }
}>

export interface Friend {
    user: User,
    status: ViewingFriendsDiv
}

export interface PendingFriendRequest {
    friendRequest: DBFriendRequest,
    sender: User,
    reciever: User,
}

export type DirectMessage = Prisma.ChannelGetPayload<{
    include: {
        directMsgFor: {
            select: {
                id: true,
                username: true,
                avatarUrl: true
            }
        }
    }
}>

export interface VoiceChatInformation {
    id: string,
    users: User[],
    startTime: Date,
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
    ClientStartWritingMessage,
    ClientStopWritingMessage,
}

export interface EditContext {
    oldMessageid: BigInt | null,
    newMessage: Message,
}

export interface WritingEvent {
    user: User,
    channelId: string,
}

export enum AllowedTypes {
    Message,
    EditContext,
    FriendRequest,
    WritingEvent,
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
