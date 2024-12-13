import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const db = new PrismaClient();

export async function DELETE(request: NextRequest) {
    const data = await request.json()
    const { serverId, requesterId } = data

    try {

        const server = await db.server.findFirst({
            where: {
                id: serverId
            }
        })



        // I'm gonna make this alot more secure but for now this is just for testing
        if (server?.ownerId !== requesterId || !requesterId) {
            return NextResponse.json({
                message: "You do not have permission to delete this server",
            }, {
                status: 403
            })
        }
        
        // Delete all channels associated with the server
        await db.channel.deleteMany({
            where: {
                serverId: serverId
            }
        });

        // Delete the server
        await db.server.delete({
            where: {
                id: serverId
            }
        });

        await db.$disconnect()
        return NextResponse.json({
            message: "Successfully deleted the server. Sorry to see you go."
        }, {status: 200})
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({message: "an error occured while deleteing the server"}, {status: 500})

    }
}