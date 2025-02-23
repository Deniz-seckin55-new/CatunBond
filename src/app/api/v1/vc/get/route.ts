import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const params = await req.json();
        const channelId: string = params.channelId;

        if (!channelId) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const vc = await db.voiceChat.findUnique({
            where: {
                channelId: channelId
            },
            include: {
                members: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
            }
        });

        if (!vc) return NextResponse.json({ message: "Voice chat not found" }, { status: 404 });

        return NextResponse.json({ data: vc }, { status: 200 });

    } catch (err) {
        if(err instanceof Error)
            console.error(err.stack);
    } finally {
        db.$disconnect();
    }
}
