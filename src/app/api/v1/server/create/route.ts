import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const user = await currentUser();
    if(!user) {
        db.$disconnect();
        return NextResponse.json({ message: "You must be logged in to create a server" }, { status: 401 })
    }
    
    // can I have my data csv please, I ask request
    // "Fuck you" says next request, who was acutally the json guy
    const data = await request.json()
    const { name } = data

    // we don't have to talk about how I handled this but it works
    try {
        // create the server, passing in the the requester's id as the owner id
        // giving it no icon and also the name that was passed in the request
        const server = await db.server.create({
            data: {
                id: uuid4(),
                ownerId: user.id,
                name: name,
                iconUrl: ""
            }
        })

        // create a channel and associate it with the server ID that came from 
        // creating the server so that the channel is only accessible through that server
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
        // return a 200 yippe ! 
        await db.$disconnect()
        return NextResponse.json({ success: "true", server: server, channel: channel }, { status: 200 })
    } catch (err) {
        // Next.js stack traces are kinda ass and don't really tell you much
        // If you want a detailed stacktrace you can use err.stack. I don't use it here
        // because my code editor keeps yelling at me.

        // I gotchu
        if (err instanceof Error) {
            console.log(err.stack)
            await db.$disconnect()
            return NextResponse.json({
                message: "an error occured"
            }, {
                status: 400
            })
        }
    }
}