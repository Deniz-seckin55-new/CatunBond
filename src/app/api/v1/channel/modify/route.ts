import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();
        const { id, name } = data;

        // No check for auth
        db.channel.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
        
        await db.$disconnect();
        return NextResponse.json({
            message: "Successfully modified the channel."
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured while modifiying the channel" }, { status: 500 })
    }
}