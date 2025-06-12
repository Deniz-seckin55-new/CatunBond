import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { serverID: string; inviteID: string } }) {
    try {
        const user = await currentUser();
        const { serverID, inviteID } = await params;

        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });
        if (!inviteID) return NextResponse.json({ message: "Invite ID is required" }, { status: 400 });

        const inviteExists: boolean = await db.server.count({ where: { id: serverID, invites: { has: inviteID } } }) > 0;

        return NextResponse.json({ data: inviteExists }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

/// Note! InviteID is same as Invite itself.
export async function DELETE(request: NextRequest, { params }: { params: { serverID: string; inviteID: string } }) {
    try {
        const user = await currentUser();
        const { serverID, inviteID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });
        if (!inviteID) return NextResponse.json({ message: "Invite ID is required" }, { status: 400 });

        const inviteExists: boolean = await db.server.count({ where: { id: serverID, invites: { has: inviteID } } }) > 0;

        if (!inviteExists) return NextResponse.json({ message: "Invite not found" }, { status: 404 });

        const getServer = await db.server.findUnique({ where: { id: serverID } });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await db.server.update({
            where: { id: serverID },
            data: {
                invites: {
                    set: getServer.invites.filter(inv => inv !== inviteID),
                }
            }
        });

        return NextResponse.json({ message: "Invite deleted" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

// You cannot modify (PUT/PATCH) an invite. 