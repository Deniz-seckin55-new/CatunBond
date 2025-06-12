import { db } from "@/lib/prisma";
import redis from "@/lib/redis";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { CreateChannelInfo } from "../../apicallreferences/utils";
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { channelId, content } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!channelId) return NextResponse.json({ message: "Missing channelId" }, { status: 400 });
        if (!content) return NextResponse.json({ message: "Missing content" }, { status: 400 });

        const channelExists = await db.channel.findUnique({ where: { id: channelId } });

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        let getChannelInfo = await db.channelInfo.findUnique({ where: { channelId } });
        let skipPermCheck = false;

        if(!getChannelInfo) {
            getChannelInfo = await CreateChannelInfo(db, channelExists);
            skipPermCheck = true;
        }

        const User_LastMessageSend = await redis.get(`USER_${user.id}_CHANNEL_${channelId}_LASTMESSAGESEND`);

        if (User_LastMessageSend && typeof User_LastMessageSend === "string" && getChannelInfo && !skipPermCheck) {
            if (getChannelInfo.slowMode !== 0) {
                const timePast = (new Date().getTime() - Number(User_LastMessageSend));
                if (timePast <= getChannelInfo.slowMode * 1000) {
                    return NextResponse.json({ message: "Not allowed to send message. Slow mode" }, { status: 400 });
                }
            }
        }

        if (getChannelInfo?.readOnly && !skipPermCheck) {
            return NextResponse.json({ message: "Not allowed to send message. Read-only" }, { status: 400 });
        }

        const newMessage = await db.messages.create({
            data: {
                content: content,
                authorId: user.id,
                channelId: channelId,
            },
        });

        await redis.set(`USER_${user.id}__CHANNEL_${channelId}_LASTMESSAGESEND`, newMessage.timestamp.getTime()+"");

        return NextResponse.json({ data: newMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}