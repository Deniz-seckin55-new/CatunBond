import { currentUser } from "@clerk/nextjs/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { channel } = data;
    const message = JSON.parse(data.message);
    try {
        const user = await currentUser();
        if(!user || !user.username) {
            db.$disconnect();
            return NextResponse.json({ message: "You are not authenticated" }, { status: 401 });
        }

        const ch = await db.channel.findFirst({
            where: {
                id: channel
            }
        });
        if(!ch) {
            await db.$disconnect();
            return NextResponse.json({ message: "Channel not found" }, { status: 404 });
        }

        const _data = {
            content: message.content,
            authorId: message.authorId,
            channelId: ch.id,
            repliedToId: (message.repliedToId) ? message.repliedToId : "NextResponse1",
        };

        console.log(_data);

        const msg = await db.messages.create({
            data: {
                content: message.content,
                repliedToId: (message.repliedToId) ? message.repliedToId : "none",
                author: {
                    connectOrCreate: {
                        create: {
                            id: user.id,
                            username: user.username,
                            avatarUrl: user.imageUrl,
                        },
                        where: {
                            id: message.authorId
                        }
                    } 
                },
                channel: {
                    connect: {
                        id: ch.id
                    }
                }
            }
        });
        await db.$disconnect();
        return NextResponse.json({ success: "true" }, { status: 200 });
    } catch (err) {
        if(err instanceof Error) {
            console.error(err.stack);
        }
        await db.$disconnect();
        return NextResponse.json({ message: "an error occured." }, { status: 500 });
    }
}