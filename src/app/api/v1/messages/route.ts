import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
const user = await currentUser();
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { channelId, content } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!channelId) return NextResponse.json({ message: "Missing channelId" }, { status: 400 });
        if (!content) return NextResponse.json({ message: "Missing content" }, { status: 400 });

        const channelExists: boolean = await db.channel.count({ where: { id: channelId } }) > 0;

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        const newMessage = await db.messages.create({
            data: {
                content: content,
                authorId: user.id,
                channelId: channelId,
            },
        });
        
        return NextResponse.json({ data: newMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}