import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { name, iconUrl } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

        const newServer = await db.server.create({
            data: {
                iconUrl: iconUrl ?? "https://cat-storage-server.web.app/data/cat1.jpeg",
                name: name,
                ownerId: user.id,
                channels: {
                    create: {
                        channelType: "TEXT",
                        name: "general",
                    }
                }
            }
        });

        return NextResponse.json({ data: newServer }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}