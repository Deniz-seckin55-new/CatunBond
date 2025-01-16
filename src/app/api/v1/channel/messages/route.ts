import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/app/app/utils/utils";
import { clerkClient } from "@clerk/nextjs/server";

const db = new PrismaClient();
const client = await clerkClient();
async function CreateMessage(message: any, ch: any): Promise<Message> {
    return {
        id: message.id.toString(),
        content: message.content,
        timestamp: message.timestamp,
        repliedTo: await (async (reply) => {
            if (!reply || reply === 'none')
                return null;
            const replyMessage = await db.messages.findUnique({ where: { id: BigInt(reply) } });
            return CreateMessage(replyMessage, ch);
        })(message.repliedToId),
        author: await (async (user) => {
            if(!user)
                return {id: "", username: "", avatarUrl: ""};
            return {
                id: user.id,
                username: user.username,
                avatarUrl: (await client.users.getUser(user.id)).imageUrl,
            }
        })((await db.user.findUnique({ where: { id: message.authorId } }))),
        channel: {
            id: ch.id,
            name: ch.name,
        }
    }
}

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

        const _messagesList = messages.map(async (message) => {
            return await CreateMessage(message, ch);
        })

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