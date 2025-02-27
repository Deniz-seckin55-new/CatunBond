import { DBVoiceChatWithMembers } from "@/app/app/utils/utils";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { voicechatID: string } }) {
    try {
        const user = await currentUser();
        const { voicechatID } = await params;

        const getVoiceChat = await db.voiceChat.findUnique({ where: { channelId: voicechatID }, include: { members: { select: { id: true, username: true, avatarUrl: true, } } } }); // Channel ID is Voice Chat ID

        if (!getVoiceChat) return NextResponse.json({ message: "Voice Chat not found" }, { status: 404 });

        return NextResponse.json({ data: getVoiceChat }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { voicechatID: string } }) {
    try {
        const user = await currentUser();
        const { voicechatID } = await params;
        const data = await request.json();
        const { action } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!action) return NextResponse.json({ message: "Action is required" }, { status: 400 });

        const getVoiceChat = await db.voiceChat.findUnique({ where: { channelId: voicechatID } });
        if (!getVoiceChat) return NextResponse.json({ message: "Voice Chat not found" }, { status: 404 });

        let updatedVoiceChat: DBVoiceChatWithMembers;

        switch (action) {
            case "JOIN":
                updatedVoiceChat = await db.voiceChat.update({
                    where: { channelId: voicechatID },
                    data: {
                        members: {
                            connect: { id: user.id }
                        }
                    },
                    include: {
                        members: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        }
                    }
                });

                return NextResponse.json({ data: updatedVoiceChat, message: "Successfully joined voice chat" }, { status: 200 });
            case "LEAVE":
                updatedVoiceChat = await db.voiceChat.update({ where: { channelId: voicechatID }, data: { members: { disconnect: { id: user.id } } }, include: { members: { select: { id: true, username: true, avatarUrl: true, } } } });

                return NextResponse.json({ message: "Successfully left voice chat" }, { status: 200 });
            default:
                return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}