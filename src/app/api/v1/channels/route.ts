import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const name: string = data.name;
        const serverId: string | null | undefined = data.server;

        if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

        if (serverId) {
            const channelExists = await db.channel.count({ where: {name: name, serverId: serverId} });
            if(channelExists) return NextResponse.json({ message: "Channel already exists" }, { status: 400 });
        }

        const newChannel = await db.channel.create({ data: { name: name, serverId: serverId } });

        return NextResponse.json({data: newChannel}, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {

    }
}