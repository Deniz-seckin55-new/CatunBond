import { CreateChannelInfo } from "@/app/api/apicallreferences/utils";
import { ChannelInfo } from "@/app/app/utils/socket_utils";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const { channelID } = await params;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists = await db.channel.findUnique({ where: { id: channelID } });

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        const getChannelInfo = await db.channelInfo.findUnique({ where: { channelId: channelID } });

        if (!getChannelInfo) {
            const newChannelInfo = await CreateChannelInfo(db, channelExists);

            return NextResponse.json({ data: newChannelInfo }, { status: 200 });
        } else {
            return NextResponse.json({ data: getChannelInfo }, { status: 200 });
        }

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function PATCH(request: NextRequest, { params }: { params: { channelID: string } }) {
    try {
        const { channelID } = await params;
        const data = await request.json();
        const channelInfo: ChannelInfo = data;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists = await db.channel.findUnique({ where: { id: channelID } });

        if (!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        const patchChannelInfo = await db.channelInfo.update({ where: { channelId: channelID }, data: channelInfo });

        if (!patchChannelInfo) {
            await CreateChannelInfo(db, channelExists);

            const patchNewChannelInfo = await db.channelInfo.update({ where: { channelId: channelID }, data: channelInfo });
        
            return NextResponse.json({ data: patchNewChannelInfo }, { status: 200 });    
        }

        return NextResponse.json({ data: patchChannelInfo }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}