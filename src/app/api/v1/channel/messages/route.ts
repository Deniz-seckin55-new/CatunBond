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

        const _messagesList = messages.map(async (message) => ({
            ...message,
            id: message.id.toString(),
            authorUsername: (await db.user.findUnique({where: {id: message.authorId}}))?.username ?? "unknown",
        }));

        const messagesList = await Promise.all(_messagesList);

        await db.$disconnect();
        return NextResponse.json({ success: "true", messages: messagesList }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        await db.$disconnect();
        return NextResponse.json({ message: "an error occured." }, { status: 500 });
    }
}