import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { channel } = data;
    try {
        const ch = await db.channel.findFirst({
            where: {
                id: channel
            }
        });
        if (!ch) {
            await db.$disconnect();
            return NextResponse.json({ message: "Channel not found" }, { status: 404 });
        }
        const messages = await db.messages.findMany({
            where: {
                channelId: ch.id
            }
        });
        const jsonMessages = messages.map((msg) => {
            return {
                id: msg.id.toString(),
                content: msg.content,
                timestamp: msg.timestamp,
                authorId: msg.authorId,
                channelId: msg.channelId,
                repliedToId: msg.repliedToId,
            };
        });
        await db.$disconnect();
        return NextResponse.json({ success: "true", messages: jsonMessages }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        await db.$disconnect();
        return NextResponse.json({ message: "an error occured." }, { status: 500 });
    }
}