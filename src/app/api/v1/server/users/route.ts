import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
const client = await clerkClient();

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

            const _usersData = users.map(async (user) => ({
                id: user.id,
                username: user.username,
                avatarUrl: (await client.users.getUser(user.id)).imageUrl
            }));

            const usersData = await Promise.all(_usersData);

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