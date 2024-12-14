import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

async function POST(request: NextRequest) {
    const data = await request.json();
    const { channel } = data;
    try {
        // Access to all channels are currently public
        
        const _channel = db.channel.findFirst({
            where: {
                id: channel
            }
        })

        await db.$disconnect();
        return NextResponse.json({ success: "true", channel: _channel }, { status: 200 })
        
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured while deleteing the server" }, { status: 500 })
    }
}