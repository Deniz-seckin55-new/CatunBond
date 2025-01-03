import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            db.$disconnect();
            return NextResponse.json({ message: "You must be logged in to join a server." }, { status: 401 })
        }

        const data = await request.json();
        const { inviteLink } = data;

        if (!inviteLink) {
            db.$disconnect();
            return NextResponse.json({ message: "Server not given." }, { status: 404 })
        }

        const server = await db.server.findFirst({
            where: {
                invites: {
                    has: inviteLink
                }
            }
        });

        if(!server) {
            db.$disconnect();
            return NextResponse.json({ message: "Server not found." }, { status: 404 })
        }

        

        const client = await clerkClient();
        const currentUserServers: string[] = Array.isArray(user.privateMetadata.userServers) ? user.privateMetadata.userServers : [];
        currentUserServers.push(server.id);

        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                userServers: currentUserServers
            }
        });
        
        db.$disconnect();
        return NextResponse.json({ message: "You have successfully joined the server." }, { status: 200 })
    } catch (err) {
        db.$disconnect();
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "an error occured" }, { status: 500 })
    }
}