import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getServer = await db.server.findUnique({
            where: { id: serverID }, include: {
                categories: {
                    include: {
                        channels: true,
                    }
                },
                members: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                }
            }, omit: {
                invites: true,
            }
        });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        return NextResponse.json({ data: getServer }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getServer = await db.server.findUnique({ where: { id: serverID } });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await db.server.delete({ where: { id: serverID } });

        return NextResponse.json({ message: "Server deleted" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function PUT(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        const data = await request.json();
        const { name, iconUrl } = data;

        const getServer = await db.server.findUnique({ where: { id: serverID } });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        if (name === getServer.name && iconUrl === getServer.iconUrl) return NextResponse.json({ message: "No changes" }, { status: 400 });

        await db.server.update({
            where: { id: serverID }, data: {
                name: name ?? getServer.name,
                iconUrl: iconUrl ?? getServer.iconUrl,
            }
        });

        return NextResponse.json({ message: "Server updated" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}