import { extractMentions } from "@/app/api/v1/utils/utils";
import { MessageUpdate } from "@/app/app/utils/socket_utils";
import { getEmitter } from "@/lib/emitter";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const messageID = (await params).messageID;

        if (!messageID) return NextResponse.json({ message: "Message ID is required" }, { status: 400 });

        const getMessage = await db.messages.findUnique({ where: { id: (Array.isArray(messageID)) ? messageID[0] : messageID }, include: { reactions: true, } });

        if (!getMessage) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        const jsonMessage = {
            ...getMessage,
            id: getMessage.id.toString(),
        }

        return NextResponse.json({ data: getMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function DELETE(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const user = await currentUser();
        const messageID = (await params).messageID;

        if (!messageID) return NextResponse.json({ message: "Message ID is required" }, { status: 400 });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const message = await db.messages.findUnique({ where: { id: messageID }, select: { authorId: true, channel: { select: { category: { select: { server: { select: { ownerId: true } } } }, id: true } } } });

        if (!message) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        if (message.authorId !== user.id && message.authorId !== message.channel.category?.server.ownerId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await db.messages.delete({ where: { id: messageID } });

        const io = await getEmitter();
        io.to(`CHANNEL_${message.channel.id}`).emit("delete_message", messageID);

        return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function PATCH(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const user = await currentUser();
        const messageID: string = (await params).messageID;
        const messageUpdateData: MessageUpdate = await request.json();

        if (!messageID) return NextResponse.json({ message: "Message ID is required" }, { status: 400 });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const message = await db.messages.findUnique({ where: { id: messageID }, select: { authorId: true, channel: { select: { category: { select: { server: { select: { ownerId: true } } } }, id: true } } } });

        if (!message) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        if (message.authorId !== user.id && message.authorId !== message.channel.category?.server.ownerId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const messageMentions = extractMentions(messageUpdateData.content);

        const {attachments, content} = messageUpdateData;

        await db.messages.update({ where: { id: messageID }, data: { attachments: attachments ?? undefined, mentions: messageMentions ?? [], content } });

        const io = await getEmitter();
        io.to(`CHANNEL_${message.channel.id}`).emit("edit_message", messageID, {...messageUpdateData, mentions: messageMentions} as MessageUpdate);

        return NextResponse.json({ message: "Message updated successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}