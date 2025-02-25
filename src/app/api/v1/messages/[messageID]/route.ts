import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
const user = await currentUser();
export async function GET(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const { messageID } = params;

        if(!messageID) return NextResponse.json({ message: "Missing messageID" }, { status: 400 });

        const messageExists: boolean = await db.messages.count({ where: { id: BigInt(messageID) } }) > 0;

        if(!messageExists) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        // Level 2 Depth
        const getMessage = await db.messages.findUnique({
            where: {
                id: BigInt(messageID)
            },
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
        });

        return NextResponse.json({ data: getMessage }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const { messageID } = params;

        if(!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if(!messageID) return NextResponse.json({ message: "Missing messageID" }, { status: 400 });

        const getMessage = await db.messages.findUnique({ where: { id: BigInt(messageID) } });

        if(!getMessage) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        if(getMessage.authorId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await db.messages.delete({ where: { id: BigInt(messageID) } });

        return NextResponse.json({ message: "Message deleted" }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function PUT(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const { messageID } = params;

        const data = await request.json();
        const { content } = data;

        if(!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if(!messageID) return NextResponse.json({ message: "Missing messageID" }, { status: 400 });

        const messageExists: boolean = await db.messages.count({ where: { id: BigInt(messageID) } }) > 0;

        if(!messageExists) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        await db.messages.update({ where: { id: BigInt(messageID) }, data: { content } });

        return NextResponse.json({ message: "Message updated" }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}