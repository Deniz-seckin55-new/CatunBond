import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getEmitter } from "@/lib/emitter";
import { MessageReactionUpdate } from "@/app/app/utils/socket_utils";

export async function GET(request: NextRequest, { params }: { params: { channelID: string; messageID: string } }) {
    try {
        // const user = await currentUser();
        // if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const { channelID, messageID } = await params;

        const getReactions = await db.reaction.findMany({ where: { messageId: messageID } });

        if (!getReactions) return NextResponse.json({ message: "No reactions found" }, { status: 404 });

        return NextResponse.json({ data: getReactions }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function PATCH(request: NextRequest, { params }: { params: { channelID: string; messageID: string } }) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const { channelID, messageID } = await params;
        const data = await request.json();
        const { emojiName } = data;

        if (!emojiName) return NextResponse.json({ message: "emojiName is required" }, { status: 400 });

        const getReaction = await db.reaction.findFirst({ where: { messageId: messageID, emojiName: emojiName, userId: user.id } });

        const io = await getEmitter();

        // Reaction exists, remove it; Reaction does not exist, add it
        if (getReaction) {
            await db.reaction.delete({ where: { id: getReaction.id } });

            const getMessageReactions = await db.messages.findUnique({
                where: { id: messageID },
                select: { reactions: true },
            });

            const pulse: MessageReactionUpdate = getMessageReactions ? getMessageReactions : { reactions: [] };
            io.to(`CHANNEL_${channelID}`).emit("reaction_message", messageID, pulse);

            return NextResponse.json({ data: { status: 0, reaction: null }, message: "Reaction removed" }, { status: 200 });
        } else {
            const genReactionId = `${messageID}:${emojiName}-${user.id}`;

            const addReaction = await db.reaction.create({
                data: {
                    messageId: messageID,
                    channelId: channelID,
                    emojiName: emojiName,
                    id: genReactionId,
                    userId: user.id,
                },
            });

            const getMessageReactions = await db.messages.findUnique({
                where: { id: messageID },
                select: { reactions: true },
            });

            const pulse: MessageReactionUpdate = getMessageReactions ? getMessageReactions : { reactions: [] };
            io.to(`CHANNEL_${channelID}`).emit("reaction_message", messageID, pulse);

            return NextResponse.json({ message: "Reaction added", data: { status: 1, reaction: addReaction } }, { status: 201 });
        }

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}