import { Message } from "@/app/app/utils/socket_utils";
import { db } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const data = await request.json();
        const { content, tempID } = data;
        const { channelID } = await params;

        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (!content) return NextResponse.json({ message: "Content is required" }, { status: 400 });
        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });
        if (!tempID) return NextResponse.json({ message: "Temp ID is required" }, { status: 400 });

        const newMessage = await db.messages.create({
            data: { content: content, channelId: channelID, authorId: user.id }
            ,
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
        });

        // io.to(channelID).emit("db_message", tempID, newMessage);

        return NextResponse.json({ data: newMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function GET(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const { channelID } = await params;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists: boolean = await db.channel.count({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID } }) > 0;

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        // Exclusive Check (Might remove later)
        const getOldMessages = await db.messages.findMany({ where: { channelId: (Array.isArray(channelID)) ? channelID[0] : channelID }, select: { author: true, id: true } });

        if (!getOldMessages) return NextResponse.json({ message: "Messages not found" });

        const clerk = await clerkClient();
        getOldMessages.forEach(async message => {
            const clerkUser = await clerk.users.getUser(message.author.id);
            if (clerkUser.hasImage) {
                await db.user.update({ where: { id: message.author.id }, data: { avatarUrl: clerkUser.imageUrl } });
            } else {
                clerk.users.updateUserProfileImage(message.author.id, {
                    file: await ((await fetch("https://cat-storage-server.web.app/data/cat1.jpeg")).blob())
                })
                await db.user.update({ where: { id: message.author.id }, data: { avatarUrl: "https://cat-storage-server.web.app/data/cat1.jpeg" } });
            }
        });
        // End

        const getMessages = await db.messages.findMany({
            where: { channelId: (Array.isArray(channelID)) ? channelID[0] : channelID },
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
            orderBy: { timestamp:  'asc'}
        });

        return NextResponse.json({ data: getMessages }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}