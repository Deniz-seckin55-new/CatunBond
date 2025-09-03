import { Channel, MessageCreate, User, UserInfo } from "@/app/app/utils/socket_utils";
import { User as ClerkUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import uuid4 from "uuid4";
import { CreateChannelInfo } from "../../apicallreferences/utils";
import redis from "@/lib/redis";
import { getEmitter } from "@/lib/emitter";

export async function GenerateUserInfo(db: PrismaClient, userId: string) {
    try {
        const userServers = await db.user.findUnique({ where: { id: userId }, select: { servers: true } });

        const info = await db.userInfo.create({
            include: { serverListOrder: true, },
            data: {
                userId: userId,
                biography: "",
                mainLink: "",
                shortDescription: "",
                serverListOrder: userServers ? {
                    createMany: {
                        data: (() => {
                            if (!userServers) return [];

                            const serverListOrder = userServers.servers.map((server, index) => {
                                return {
                                    id: uuid4(),
                                    serverId: server.id,
                                    index: index,
                                }
                            });

                            return serverListOrder;
                        })()
                    },
                } : {},
            }
        });

        return info;
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return undefined;
    }
}

// export async function FixUserInfoServerListOrder(db: PrismaClient, userId: string) {
//     try {
//         const userServers = await db.user.findUnique({ where: { id: userId }, select: { servers: true } });
//         console.log("User ID:", userId);
//         if (!userId) return;

//         const info = await db.userInfo.upsert({
//             where: { userId: userId },
//             include: { serverListOrder: true },
//             create: {
//                 userId: userId, biography: "", mainLink: "", shortDescription: "", serverListOrder: userServers ? {
//                     createMany: {
//                         data: (() => {
//                             if (!userServers) return [];

//                             const serverListOrder = userServers.servers.map((server, index) => {
//                                 return {
//                                     id: server.id,
//                                     index: index,
//                                 }
//                             });

//                             return serverListOrder;
//                         })()
//                     },
//                 } : {}
//             },
//             update: {
//                 serverListOrder: userServers ? {
//                     createMany: {
//                         data: (() => {
//                             if (!userServers) return [];

//                             const serverListOrder = userServers.servers.map((server, index) => {
//                                 return {
//                                     id: server.id,
//                                     index: index,
//                                 }
//                             });

//                             return serverListOrder;
//                         })()
//                     },
//                 } : {},
//             }
//         });

//         return info;
//     } catch (err) {
//         if (err instanceof Error)
//             console.log(err.stack);
//         return undefined;
//     }
// }

export async function FixUserInfoServerListOrder(db: PrismaClient, userId: string) {
    try {
        if (!userId) return;

        const userServers = await db.user.findUnique({
            where: { id: userId },
            select: { servers: true },
        });

        if (!userServers) return;

        const serverListData = userServers.servers.map((server, index) => ({
            id: uuid4(),
            serverId: server.id,
            index,
        }));

        // Delete existing server list order entries for this user
        await db.serverListOrderElement.deleteMany({
            where: { userInfoUserId: userId },
        });

        const info = await db.userInfo.upsert({
            where: { userId: userId },
            include: { serverListOrder: true },
            create: {
                userId,
                biography: "",
                mainLink: "",
                shortDescription: "",
                serverListOrder: {
                    createMany: {
                        data: serverListData,
                    },
                },
            },
            update: {
                // Don't use `set` — we already cleaned up above
                serverListOrder: {
                    createMany: {
                        data: serverListData,
                        skipDuplicates: true,
                    },
                },
            },
        });

        return info;
    } catch (err) {
        if (err instanceof Error) console.log(err.stack);
        return undefined;
    }
}


export async function GetUserInfo(db: PrismaClient, userId: string): Promise<UserInfo | undefined> {
    try {
        const userServers = await db.user.findUnique({ where: { id: userId }, select: { servers: true } });
        const getUserInfo = await db.userInfo.findUnique({ where: { userId: userId }, include: { serverListOrder: true } });


        if (!getUserInfo) return (await GenerateUserInfo(db, userId));

        if (!userServers) return getUserInfo;

        if (getUserInfo.serverListOrder.length !== userServers.servers.length) {
            console.log("Fixing old user server list order... ", userId);
            return await FixUserInfoServerListOrder(db, userId);
        }
        return getUserInfo;
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
    }
}

// function to... generate random string of characters :yeppers:
export function genInvite(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890'
    let str: string = '';
    for (let i = 0; i < length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return str;
}
export async function UserIDListToSmallUserList(userIds: string[], db: PrismaClient) {
    const result = Promise.all(userIds.map(async (userId) => {
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) return null;
        return {
            id: user.id,
            username: user.username,
            avatarUrl: user.avatarUrl,
        }
    }));
    return await (result);
}

export const defaultServerGet = {
    include: {
        categories: {
            include: {
                channels: {
                    orderBy: { index: "asc" }
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
    }, omit: {
        invites: true,
    }
}

export const messageMentionsRegex = /(?<!\\)\@([^ \n]+)( |$)/g;

export const extractMentions = (text: string) => {
    const r = text.matchAll(messageMentionsRegex);
    return Array.from(r.map(x => x[1]));
}

export async function CreateUserDirectMessageChannel(user: ClerkUser | null, withUserId: string, db: PrismaClient) {
    try {
        if (!withUserId) return NextResponse.json({ message: "Missing withUserId" }, { status: 400 });
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (withUserId === user.id) return NextResponse.json({ message: "You can't send a message to yourself" }, { status: 400 });

        const withUserExists: boolean = await db.user.count({ where: { id: withUserId } }) > 0;

        if (!withUserExists) return NextResponse.json({ message: "With User not found" }, { status: 404 });

        const newDirectMessage = await db.channel.create({
            data: {
                channelType: "DIRECTMESSAGE",
                name: '',
                directMsgFor: {
                    connect: [{ id: withUserId }, { id: user.id }]
                },
            },
            include: {
                directMsgFor: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true
                    }
                },
            }
        });

        return NextResponse.json({ data: newDirectMessage }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function CreateServerInvite(user: ClerkUser | null, serverID: string, db: PrismaClient) {
    try {
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getServer = await db.server.findUnique({ where: { id: serverID } });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        let serverInvite = genInvite(8) + Date.now().toString().slice(-2);

        let inviteExists: boolean = await db.server.count({ where: { invites: { has: serverInvite } } }) > 0;

        let tries = 0;

        while (inviteExists) {
            if (tries > 5) {
                return NextResponse.json({ message: "Server invite could not be generated" }, { status: 500 });
            }

            serverInvite = genInvite(8 + tries) + Date.now().toString().slice(-2);
            inviteExists = await db.server.count({ where: { invites: { has: serverInvite } } }) > 0;

            tries++;
        }

        await db.server.update({
            where: { id: serverID },
            data: {
                invites: {
                    push: serverInvite,
                }
            }
        });

        return NextResponse.json({ data: serverInvite, message: "Invite created" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function CreateMessage(db: PrismaClient, channelID: string, userID: string | null, MessageCreate: MessageCreate) {
    try {
        if (!userID) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (!MessageCreate) return NextResponse.json({ message: "MessageCreate is required" }, { status: 400 });
        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const [dbUser, channelExists, getChannelInfoDB, User_LastMessageSend] = await Promise.all([
            db.user.findUnique({ where: { id: userID } }),
            db.channel.findUnique({ where: { id: channelID }, include: { category: { select: { serverId: true } } } }),
            db.channelInfo.findUnique({ where: { channelId: channelID } }),
            redis.get(`USER_${userID}_CHANNEL_${channelID}_LASTMESSAGESEND`),
        ]);
        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });
        if (!dbUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        let skipPermCheck = false;
        let getChannelInfo;

        if (!getChannelInfoDB) {
            getChannelInfo = await CreateChannelInfo(db, channelExists);
            skipPermCheck = true;
        } else getChannelInfo = getChannelInfoDB;

        if (User_LastMessageSend && typeof User_LastMessageSend === "string" && getChannelInfo && !skipPermCheck) {
            if (getChannelInfo.slowMode !== 0) {
                const timePast = (Date.now() - Number(User_LastMessageSend));
                if (timePast <= getChannelInfo.slowMode * 1000) {
                    return NextResponse.json({ message: "Not allowed to send message. Slow mode" }, { status: 400 });
                }
            }
        }

        if (getChannelInfo?.readOnly && !skipPermCheck) {
            return NextResponse.json({ message: "Not allowed to send message. Read-only" }, { status: 400 });
        }

        const messageMentions = extractMentions(MessageCreate.content);

        const [mentionedUsers, newMessage] = await Promise.all([
            messageMentions.length > 0
                ? db.user.findMany({ where: { username: { in: messageMentions } } })
                : [],
            db.messages.create({
                data: { ...MessageCreate, channelId: channelID, authorId: userID, attachments: MessageCreate.attachments ?? undefined, mentions: messageMentions ?? [] },
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
            }),
        ])

        const [_, io] = await Promise.all([
            redis.set(`USER_${userID}_CHANNEL_${channelID}_LASTMESSAGESEND`, newMessage.timestamp.getTime() + ""),
            getEmitter(),
        ])

        io.to(`CHANNEL_${channelID}`).emit("message", newMessage);

        if (messageMentions.length > 0)
            mentionedUsers.forEach(mentionedUser => {
                io.to(`USER_${mentionedUser.id}`).emit(
                    "user_mentioned",
                    channelExists.category?.serverId ?? "",
                    channelExists as Channel,
                    dbUser as User
                );
            });

        return NextResponse.json({ data: newMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export function sanitizeKey(key: string) {
  return key
    .normalize('NFD')                     // decompose accented letters
    .replace(/[\u0300-\u036f]/g, '')      // remove accents
    .replace(/\s+/g, '_')                  // replace spaces with underscore
    .replace(/[^\w\-\.]/g, '')             // remove non-word chars except dash & dot
    .replace("Ğ", "G")
    .toLowerCase();
}