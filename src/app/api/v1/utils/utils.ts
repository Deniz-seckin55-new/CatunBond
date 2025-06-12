import { UserInfo } from "@/app/app/utils/socket_utils";
import { PrismaClient } from "@prisma/client";

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
                                    id: server.id,
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

export async function FixUserInfoServerListOrder(db: PrismaClient, userId: string) {
    try {
        const userServers = await db.user.findUnique({ where: { id: userId }, select: { servers: true } });

        if(!userId) return;

        const info = await db.userInfo.update({
            where: { userId: userId },
            include: { serverListOrder: true },
            data: {
                serverListOrder: userServers ? {
                    createMany: {
                        data: (() => {
                            if (!userServers) return [];

                            const serverListOrder = userServers.servers.map((server, index) => {
                                return {
                                    id: server.id,
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
                    orderBy: { index: "asc"}
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