import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, dmForUserId } = data;

        const user = await currentUser();

        if(!user) {
            return NextResponse.json({message: "You must be logged in to create a direct message."}, {status: 403});
        }

        const channel = await db.channel.create({
            data: {
                id: uuid4(),
                name: name,
                directMsgFor: {
                    connect: [{ id: dmForUserId }, {id: user.id}]
                },
            }
        });
        return NextResponse.json({data: {id: channel.id, name: channel.name}}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
            return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}