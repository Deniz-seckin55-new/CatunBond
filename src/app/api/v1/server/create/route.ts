import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) { 
    // types :(
    const data = await request.json()
    const {ownerId, name} = data

    try {
    const server = await db.server.create({
        data: {
            id: uuid4(),
            ownerId: ownerId,
            name: name,
            iconUrl: ""
        }
    })

    const channel = await db.channel.create({
        data: {
            id: uuid4(),
            name: "general",
            server: {
                connect: {
                    id: server.id
                }
            }

        }
    })
    await db.$disconnect()
    return NextResponse.json({ success: "true", server: server, channel: channel }, { status: 200 })
    } catch(err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({
            message: "an error occured"
        }, {
            status: 400
        })
    }
}