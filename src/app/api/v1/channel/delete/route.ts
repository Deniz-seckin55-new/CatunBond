import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

async function DELETE(request: NextRequest) {
    try {
        const data = await request.json();
        const { channel, requesterId } = data;

        const _channel = await db.channel.findFirst({
            where: {
                id: channel
            }
        })

        const _server = await db.server.findFirst({
            where: {
                id: _channel?.serverId
            }
        })

        // Not a DM
        if (_server) {
            // Replace this code with "currentUser()"
            if (_server?.ownerId == requesterId) {
                db.channel.delete({
                    where: {
                        id: channel
                    }
                })
            } else {
                await db.$disconnect();
                return NextResponse.json({
                    message: "You do not have permission to delete this server",
                }, {
                    status: 403
                })
            }
        } else {
            // Is a DM

            // No auth check (maybe check if user exists in DM)
            db.channel.delete({
                where: {
                    id: channel
                }
            })
        }

        await db.$disconnect();
        return NextResponse.json({
            message: "Successfully deleted the channel."
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured while deleteing the server" }, { status: 500 })
    }
}