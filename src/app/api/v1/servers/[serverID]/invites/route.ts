import { db } from "@/lib/prisma";
import { genInvite } from "../../../utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getServer = await db.server.findUnique({ where: { id: serverID }, select: { ownerId: true, invites: true } });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        

        return NextResponse.json({ data: getServer.invites }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function POST(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getServer = await db.server.findUnique({ where: { id: serverID } });

        if (!getServer) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        if (getServer.ownerId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        let serverInvite = genInvite(8) + Date.now().toString().slice(-2);

        let inviteExists: boolean = await db.server.count({ where: { invites: { has: serverInvite } } }) > 0;

        let tries = 0;

        while (inviteExists) {
            if (tries > 5) {
                return NextResponse.json({ message: "Server invite could not be generated" }, { status: 500 });
            }

            serverInvite = genInvite(8 + tries) + Date.now().toString().slice(-2);
            inviteExists = await db.server.count({ where: { invites: { has: serverInvite } } }) > 0;

            tries++;
        }

        await db.server.update({
            where: { id: serverID },
            data: {
                invites: {
                    push: serverInvite,
                }
            }
        });

        return NextResponse.json({ data: serverInvite, message: "Invite created" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}