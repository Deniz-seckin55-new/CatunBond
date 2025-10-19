import { User } from "@/app/app/utils/socket_utils";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { CreateServerInvite, CreateUserDirectMessageChannel } from "../../../utils/utils";
import { getEmitter } from "@/lib/emitter";

export async function POST(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const { serverID } = await params;

        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Not Authorized" }, { status: 400 });

        const data = await request.json();
        const users: User[] = data.users;

        const getServer = await db.server.findUnique({where: {id: serverID}});

        if(!getServer) return NextResponse.json({message: "Server not found"}, {status: 404});

        // Make users list unique by ID
        const uniqueUsers = Array.from(new Map(users.map(u => [u.id, u])).values());

        await Promise.all(uniqueUsers.map(async friend => {
            const GetFriend = await db.user.findUnique({ where: { id: friend.id } });

            if (!GetFriend) return NextResponse.json({ message: "User not found" }, { status: 400 });

            let getDirectMessage = await db.channel.findFirst({
                where: {
                    AND: [
                        { directMsgFor: { some: { id: user.id } } },
                        { directMsgFor: { some: { id: friend.id } } },
                    ]
                },
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
            });

            if (!getDirectMessage) {
                await CreateUserDirectMessageChannel(user, friend.id, db);

                getDirectMessage = await db.channel.findFirst({
                    where: {
                        AND: [
                            { directMsgFor: { some: { id: user.id } } },
                            { directMsgFor: { some: { id: friend.id } } },
                        ]
                    },
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
                });

                if (!getDirectMessage) return NextResponse.json({ message: "An error accured. You shouldn't see this..." }, { status: 400 });
            }

            let inviteLink: string;
            
            if(getServer.invites.length <= 0) {
                const resp = await CreateServerInvite(user, serverID, db);
                const resp_data = await resp.json();
                if(resp_data.data) {
                    inviteLink = resp_data.data;
                } else {
                    return NextResponse.json({message: "Failed to create invite url, please try again or create one yourself from Server Settings"}, {status: 400});
                }
            } else {
                inviteLink = getServer.invites[getServer.invites.length-1];
            }

            const newMessage = await db.messages.create({ data: { content: `<<<serverinvite>>${serverID}:${inviteLink}</0>`, channelId: getDirectMessage.id, authorId: user.id }, include: {
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
            } });

            const io = await getEmitter();
            io.to(`CHANNEL_${getDirectMessage.id}`).emit("message", newMessage);
        }));

        return NextResponse.json({ success: true, message: "Successfully sent server invites!" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}