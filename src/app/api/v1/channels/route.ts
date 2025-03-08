import { db } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const name: string = data.name;
        const serverId: string | null | undefined = data.serverId;
        const categoryId: string | null | undefined = data.categoryId;

        if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

        if (serverId && categoryId) {
            const channelExists = await db.channel.count({ where: { name: name, category: { id: categoryId, serverId: serverId } } });
            if (channelExists) return NextResponse.json({ message: "Channel already exists" }, { status: 400 });

            const newChannel = await db.channel.create({
                data: {
                    name: name,
                    category: {
                        connect: {
                            id: categoryId,
                            serverId: serverId,
                        }
                    }
                }
            });
            return NextResponse.json({ data: newChannel }, { status: 200 });
        } else if (serverId || categoryId) {
            return NextResponse.json({ message: "serverId or categoryId is missing" }, { status: 400 });
        }

        const newChannel = await db.channel.create({ data: { name: name, channelType: "DIRECTMESSAGE" } }); // Direct Message

        return NextResponse.json({ data: newChannel }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {

    }
}