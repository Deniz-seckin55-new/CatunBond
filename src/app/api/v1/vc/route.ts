import { PrismaClient } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { VoiceChatInformation } from "@/app/app/utils/socket_utils";

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const channelId: string = data.channelId;
        const serverId: string = data.channelId;

        if (!channelId) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        if((await db.voiceChat.findUnique({where: {channelId: channelId}}))) return NextResponse.json({ message: "Voice chat already exists" }, { status: 400 });

        let vc;

        if(!serverId || serverId == '')
            vc = await db.voiceChat.create({
                data: {
                    channelId: channelId,
                }
            })
        else 
            vc = await db.voiceChat.create({
                data: {
                    channelId: channelId,
                    serverId: serverId,
                }
            })

            const vcInfo : VoiceChatInformation = {
                id: vc.channelId,
                users: [],
                startTime: vc.createdAt,
            }

        return NextResponse.json({ data: vcInfo }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.error(err.stack);
    } finally {
        db.$disconnect();
    }
}