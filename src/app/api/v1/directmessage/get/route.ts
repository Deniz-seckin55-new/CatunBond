import { DirectMessage } from "@/app/app/utils/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { dmId } = data;

        const channel = await db.channel.findUnique({where: {id: dmId}});

        if(!channel) {
            return NextResponse.json({message: "Couldn't find Direct Message."}, {status: 404});
        }

        const directMsgFor = await db.channel.findUnique({where: {id: dmId}}).directMsgFor();

        if(!directMsgFor) {
            return NextResponse.json({message: "Couldn't find Direct Message Users."}, {status: 404});
        }

        const directMessage: DirectMessage = {
            id: channel.id,
            name: channel.name,
            users: directMsgFor.map(user => ({
                id: user.id,
                username: user.username,
                avatarUrl: user.avatarUrl ?? '',
            }))
        }

        return NextResponse.json({data: directMessage}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
            return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}