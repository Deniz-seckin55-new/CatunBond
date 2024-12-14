import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const db = new PrismaClient();

export async function DELETE(request: NextRequest) {
    const user = await currentUser();
    if(!user) {
        db.$disconnect();
        return NextResponse.json({ message: "You must be logged in to delete a server" }, { status: 401 })
    }

    const data = await request.json()
    const { server } = data

    try {
        // find the server the user is trying to delete
        const _server = await db.server.findFirst({
            where: {
                id: server
            }
        })



        // I'm gonna make this alot more secure but for now this is just for testing
        // Replace this code with "currentUser()" Done
        if (_server?.ownerId !== user.id) {
            db.$disconnect();
            return NextResponse.json({
                message: "You do not have permission to delete this server",
            }, {
                status: 403
            })
        }

        // Delete all channels associated with the server
        await db.channel.deleteMany({
            where: {
                serverId: server
            }
        });

        // Delete the server
        await db.server.delete({
            where: {
                id: server
            }
        });

        await db.$disconnect()
        return NextResponse.json({
            message: "Successfully deleted the server. Sorry to see you go."
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured while deleteing the server" }, { status: 500 })
    }
}