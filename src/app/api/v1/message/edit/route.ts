import { Message } from "@/app/app/utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json()
    const _messageId = data.messageId as string;
    const messageId = BigInt(_messageId);
    const newMessage = data.newMessage as Message;

    try {
        const user = await currentUser();
        const message = await db.messages.findUnique({where: {id: messageId}});
        
        if(!message) {
            db.$disconnect();
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        if(!user) {
            db.$disconnect();
            return NextResponse.json({ message: "You must be logged in to edit a message." }, { status: 401 })
        }

        if(user.id !== message.authorId.toString()) {
            db.$disconnect();
            return NextResponse.json({ message: "You do not have permission to edit this message." }, { status: 403 })
        }

        await db.messages.update({where: {id: messageId},data: {
            content: newMessage.content,
        }})

        await db.$disconnect();
        return NextResponse.json({ success: "true" }, { status: 200 })
    } catch (err) {
        db.$disconnect();
        if (err instanceof Error) {
            console.log(err)
            return NextResponse.json({
                message: "an error occured"
            }, {
                status: 400
            })
        }
    }
}