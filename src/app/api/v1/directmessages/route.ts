import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
const user = await currentUser();
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { withUserId } = data;

        if(!withUserId) return NextResponse.json({ message: "Missing withUserId" }, { status: 400 });
        if(!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if(withUserId === user.id) return NextResponse.json({ message: "You can't send a message to yourself" }, { status: 400 });

        const withUserExists: boolean = await db.user.count({ where: { id: withUserId } }) > 0;

        if(!withUserExists) return NextResponse.json({ message: "With User not found" }, { status: 404 });

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
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}