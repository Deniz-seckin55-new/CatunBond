import { useUserStore } from "@/store/users";
import { FriendRequest as DBFriendRequest, Prisma } from "@prisma/client";
import axios from "axios";
import { ViewingFriendsDiv } from "./utils";
import { SendMessageISchema } from "./schemas";
import { z } from "zod";


export type Server = Prisma.ServerGetPayload<{
    include: {
        categories: {
            include: {
                channels: {
                    select: {
                        id: true,
                        name: true,
                        channelType: true,
                        categoryId: true,
                    }
                },
            }
        },
        members: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        }
    },
    omit: {
        invites: true,
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
}>

export type SendMessageI = z.infer<typeof SendMessageISchema>;

export type Channel = Prisma.ChannelGetPayload<{
    select: {
        id: true,
        name: true,
        channelType: true,
        categoryId: true,
    }
}>;

export type Category = Prisma.CategoryGetPayload<{
    include: {
        channels: {
            select: {
                id: true,
                name: true,
                categoryId: true,
                channelType: true,
            }
        },
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
        variables: true,
        friends: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        },
        receivedRequests: {
            include: {
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
            }
        },
        sentRequests: {
            include: {
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
            }
        },
        directMsgs: {
            select: {
                id: true,
                directMsgFor: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
                channelType: true,
            }
        },
        servers: {
            select: {
                categories: {
                    include: {
                        channels: {
                            select: {
                                id: true,
                                name: true,
                                categoryId: true,
                                channelType: true,
                            }
                        },
                    }
                },
                id: true,
                iconUrl: true,
                members: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                name: true,
                ownerId: true,
            }
        },
        username: true,
        avatarUrl: true,
        blocked: true,
    }
}>

export interface Friend {
    user: User,
    status: ViewingFriendsDiv
}

export type PendingFriendRequest = Prisma.FriendRequestGetPayload<{
    include: {
        receiver: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        },
        sender: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        }
    }
}>

export type DirectMessage = Prisma.ChannelGetPayload<{
    select: {
        id: true,
        directMsgFor: {
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            },
        },
        channelType: true,
    }
}>

export type UserInfo = Prisma.UserInfoGetPayload<{ include: { serverListOrder: true } }>

export type UserNote = Prisma.UserNoteGetPayload<true>

export type ServerInfo = Prisma.ServerInfoGetPayload<true>

export type ChannelInfo = Prisma.ChannelInfoGetPayload<true>

export interface ServerInvites {
    serverId: string;
    invites: string[];
}

export interface UserNotes {
    userId: string;
    notes: UserNote[];
}

export interface UserRelativeInfo {
    user: User;
    mutualFriends: User[];
    mutualServers: Server[];
    myNotes: string;
}

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
    ClientReconnectEvent,
    ClientAddReactionEvent,
    CleintRemoveReactionEvent,
}

export interface EditContext {
    messageId: string,
    channelId: string,
    newContent: string,
}

export interface WritingEvent {
    user: User,
    channelId: string,
}

export interface ReconnectData {
    channelId?: string;
    lastSeenMessageTimestamp?: Date;
}

export interface ReactionRemoveData {
    messageId: string;
    reactionEmojiName: string;
}

export enum AllowedTypes {
    Message,
    MessageI,
    EditContext,
    FriendRequest,
    WritingEvent,
    ReconnectData,
    Reaction,
    ReactionRemoveData,
}

export interface SocketData {
    infoType: SocketInformationType,
    dataType: AllowedTypes,
    data: unknown
}

export interface MessageSocketPacket {
    Message: Message;
}

export interface ClientResponsePacket {
    dataType: AllowedTypes,
    data: unknown
}

export const getUserSR = async (userID: string) => {
    const userStore = useUserStore();


    if (userID === "" || !userID) return;

    if (userStore.getExistingUser(userID)) {
        return userStore.getExistingUser(userID);
    }

    const resp = await axios.get(`/api/v1/users/${userID}`);

    if (!resp.data.data) return;

    const newUser: User = resp.data.data;

    userStore.addUser(newUser);
}
export const SortByDate = <T extends { timestamp: Date }>(array: T[]) => {
    return array.toSorted((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export type MessageUpdate = Prisma.MessagesGetPayload<{
    omit: {
        id: true,
        authorId: true,
        channelId: true,
        repliedToId: true,
        timestamp: true,
    }
}>;

export type MessageReactionUpdate = Prisma.MessagesGetPayload<{
    select: {
        reactions: true,
    }
}>;

export type MessageCreate = Prisma.MessagesGetPayload<{
    omit: {
        id: true,
        authorId: true,
        channelId: true,
        timestamp: true,
        mentions: true,
    },
}>

export interface Attachment {
    filename: string;
    publicUrl: string;
}

export type JsonAttachments = Attachment[];