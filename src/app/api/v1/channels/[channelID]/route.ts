import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(request: NextRequest, { params }: {params: {channelID: string}}) {
    try {
        const { channelID } = params;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const getChannel = await db.channel.findUnique({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID } });

        if (!getChannel) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        return NextResponse.json({ data: getChannel }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function DELETE(request: NextRequest, { params }: {params: {channelID: string}}) {
    try {
        const { channelID } = params;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        await db.channel.delete({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID } });

        return NextResponse.json({ message: "Channel deleted successfully" }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function PATCH(request: NextRequest, { params }: {params: {channelID: string}}) {
    try {
        const { channelID } = params;

        const data = await request.json();
        const newName = data.name;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists: boolean = await db.channel.count({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID } }) > 0;

        if(!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        await db.channel.update({ where: { id: (Array.isArray(channelID)) ? channelID[0] : channelID }, data: {
            name: newName,
        } });

        return NextResponse.json({ message: "Channel updated successfully" }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
    } finally {
        db.$disconnect();
    }
}