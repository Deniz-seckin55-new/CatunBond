import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json()
    const serverId = data.serverId
    //tab // try finding the server
    try {
        const serverData = await db.server.findFirst({
            where: {
                id: serverId
            }
        })

        console.log(serverData)

        if (serverData) {
            const users = await db.user.findMany({ where: { servers: { some: { id: serverId } } } });

            const usersData = users.map(user => ({
                id: user.id,
                username: user.username,
                avatarUrl: user.avatarUrl
            }));

            console.log(serverId);

            await db.$disconnect()
            return NextResponse.json({ data: usersData }, { status: 200 })
        } else {
            await db.$disconnect()
            return NextResponse.json({ message: "Server not found" }, { status: 404 })
        }
    } catch (err) {
        console.log(err)
        await db.$disconnect()
        return NextResponse.json({
            message: "Something went wrong, check console logs for more information"
        }, {
            status: 400
        })
    }
}