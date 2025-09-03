import { CreateChannelInfo } from "@/app/api/apicallreferences/utils";
import { Channel, JsonAttachments, MessageCreate, User } from "@/app/app/utils/socket_utils";
import { getEmitter } from "@/lib/emitter";
import { db } from "@/lib/prisma";
import redis from "@/lib/redis";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { CreateMessage, extractMentions } from "../../../utils/utils";

export async function POST(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const data = await request.json();
        const MessageCreate: MessageCreate = data;
        const { channelID } = await params;

        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (!MessageCreate) return NextResponse.json({ message: "MessageCreate is required" }, { status: 400 });
        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        return CreateMessage(db, channelID, user.id, MessageCreate);
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const { channelID } = await params;
        const maxLimit = Number(request.nextUrl.searchParams.get("limit"));

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists: boolean = await db.channel.count({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID } }) > 0;

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        // Exclusive Check (Might remove later)
        const getOldMessages = await db.messages.findMany({ where: { channelId: (Array.isArray(channelID)) ? channelID[0] : channelID }, select: { author: true, id: true } });

        if (!getOldMessages) return NextResponse.json({ message: "Messages not found" });

        // const clerk = await clerkClient();
        // getOldMessages.forEach(async message => {
        //     const clerkUser = await clerk.users.getUser(message.author.id);
        //     if (clerkUser.hasImage) {
        //         await db.user.update({ where: { id: message.author.id }, data: { avatarUrl: clerkUser.imageUrl } });
        //     } else {
        //         clerk.users.updateUserProfileImage(message.author.id, {
        //             file: await ((await fetch("https://cat-storage-server.web.app/data/cat1.jpeg")).blob())
        //         })
        //         await db.user.update({ where: { id: message.author.id }, data: { avatarUrl: "https://cat-storage-server.web.app/data/cat1.jpeg" } });
        //     }
        // });
        // End

        const getMessages = await db.messages.findMany({
            where: { channelId: channelID },
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
                        },
                        reactions: true,
                    },
                },
                reactions: true,
            },
            orderBy: { timestamp: 'desc' },
            take: Math.min(maxLimit, 250) ?? 50, // Max 250, default 50
        });

        return NextResponse.json({ data: getMessages.toReversed() }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}