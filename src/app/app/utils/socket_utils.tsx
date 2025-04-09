import { useUserStore } from "@/store/users";
import { ViewingFriendsDiv } from "./utils";
import { FriendRequest as DBFriendRequest, Prisma } from "@prisma/client";
import axios from "axios";

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
                }
            },
        }
    },
}>

export interface SendMessageI {
    tempID: string;
    content: string;
    channelId: string;
    author: {
        id: string;
        username: string;
        avatarUrl: string | null;
    }
    repliedToId?: string;
    repliedToAuthor?: {
        id: string;
        username: string;
        avatarUrl: string | null;
    };
    repliedToContent?: string;
    timestamp: Date;
}

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

export type UserInfo = Prisma.UserInfoGetPayload<{}>

export type UserNote = Prisma.UserNoteGetPayload<{}>

export type ServerInfo = Prisma.ServerInfoGetPayload<{}>

export type ChannelInfo = Prisma.ChannelInfoGetPayload<{}>

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

export enum AllowedTypes {
    Message,
    MessageI,
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