import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { name, server } = data

    try {
        const channel = await db.channel.create({
            data: {
                id: uuid4(),
                name: name,
                server: {
                    connect: {
                        id: server
                    }
                }
            }
        })

        await db.$disconnect();
        return NextResponse.json({ success: "true", channel: channel }, { status: 200 })
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