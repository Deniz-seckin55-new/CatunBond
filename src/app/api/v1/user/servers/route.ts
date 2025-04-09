import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getUserServers = await db.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                servers: {
                    select: {
                        categories: {
                            include: {
                                channels: {
                                    select: {
                                        id: true,
                                        name: true,
                                        channelType: true,
                                    }
                                },
                            }
                        },
                        id: true,
                        iconUrl: true,
                        members: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        },
                        name: true,
                        ownerId: true,
                    }
                },
            }
        });

        if (!getUserServers) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ data: getUserServers.servers }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { inviteLink } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!inviteLink) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const userExists: boolean = await db.user.count({ where: { id: user.id } }) > 0;
        const serverExists = await db.server.findFirst({ where: { invites: { has: inviteLink }}, include: { members: { select: { _count: true, }}} });

        if (!userExists) return NextResponse.json({ message: "User not found" }, { status: 404 });
        if (!serverExists) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        const userAlreadyJoinedServer: boolean = await db.user.count({ where: { id: user.id, servers: { some: { id: serverExists.id } } } }) > 0;
        if (userAlreadyJoinedServer) return NextResponse.json({ message: "User already joined this server" }, { status: 400 });

        const serverInfoMaxUsers = (await db.serverInfo.findUnique({ where: { serverId: serverExists.id }, select: { maxUsers: true } }))?.maxUsers ?? 50; // Default

        if(serverExists.members.length >= serverInfoMaxUsers) return NextResponse.json({ message: "Server is full" }, { status: 400 });

        await db.user.update({ where: { id: user.id }, data: { servers: { connect: { id: serverExists.id } } } });

        return NextResponse.json({ message: "Server joined successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { serverId } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverId) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const userExists: boolean = await db.user.count({ where: { id: user.id } }) > 0;
        const serverExists: boolean = await db.server.count({ where: { id: serverId } }) > 0;

        if (!userExists) return NextResponse.json({ message: "User not found" }, { status: 404 });
        if (!serverExists) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        const userAlreadyJoinedServer: boolean = await db.user.count({ where: { id: user.id, servers: { some: { id: serverId } } } }) > 0;
        if (!userAlreadyJoinedServer) return NextResponse.json({ message: "User is not in the server" }, { status: 400 });

        await db.user.update({ where: { id: user.id }, data: { servers: { disconnect: { id: serverId } } } });

        return NextResponse.json({ message: "Server left successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}