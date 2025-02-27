import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { channelId, serverId } = data;

        let newVoiceChat;

        if (serverId && serverId !== '')
            newVoiceChat = await db.voiceChat.create({
                data: {
                    channelId: channelId,
                    serverId: serverId,
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
        else
            newVoiceChat = await db.voiceChat.create({
                data: {
                    channelId: channelId,
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
        
        return NextResponse.json({ data: newVoiceChat }, { status: 200});
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}