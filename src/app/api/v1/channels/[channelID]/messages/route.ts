import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function POST(request: NextRequest, { params }: {params: {channelID: string}}) {
    try {
        const data = await request.json();
        const { content } = data;
        const { channelID } = params;

        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (!content) return NextResponse.json({ message: "Content is required" }, { status: 400 });
        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        await db.messages.create({ data: { content: content, channelId: channelID, authorId: user.id } });

        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function GET(request: NextRequest, { params }: {params: {channelID: string}}) {
    try {
        const { channelID } = params;

        if (!channelID) return NextResponse.json({ message: "Channel ID is required" }, { status: 400 });

        const channelExists: boolean = await db.channel.count({ where: {id: (Array.isArray(channelID)) ? channelID[0] : channelID }}) > 0;

        if(!channelExists) return NextResponse.json({ message: "Channel not found" }, { status: 404 });

        const getMessages = await db.messages.findMany({ where: { channelId: (Array.isArray(channelID)) ? channelID[0] : channelID }, include: {author: true, channel: true} });

        return NextResponse.json({ data: getMessages }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}