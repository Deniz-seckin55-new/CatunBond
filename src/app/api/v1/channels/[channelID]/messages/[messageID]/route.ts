import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET(request: NextRequest, { params }: {params: {messageID: string}}) {
    try {
        const messageID = params.messageID;

        if (!messageID) return NextResponse.json({ message: "Message ID is required" }, { status: 400 });

        const getMessage = await db.messages.findUnique({ where: { id: Number((Array.isArray(messageID)) ? messageID[0] : messageID) } });

        if (!getMessage) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        return NextResponse.json({ data: getMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function DELETE(request: NextRequest, { params }: {params: {messageID: string}}) {
    try {
        const messageID = params.messageID;

        if(!messageID) return NextResponse.json({ message: "Message ID is required" }, { status: 400 });

        const messageExists = await db.messages.count({ where: {id: BigInt(messageID) }}) > 0;

        if(!messageExists) return NextResponse.json({ message: "Message not found" }, { status: 404 });

        await db.messages.delete({ where: { id: BigInt(messageID) }});

        return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}