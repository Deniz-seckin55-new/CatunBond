import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ message: "You must be logged in to join a server." }, { status: 401 })
        }

        const data = await request.json();
        const { serverId } = data;

        if (!serverId) {
            return NextResponse.json({ message: "Server not given." }, { status: 404 });
        }

        const client = await clerkClient();
        const existingUserServers: string[] = Array.isArray(user.privateMetadata.userServers) ? user.privateMetadata.userServers : [];
        if(!existingUserServers.includes(serverId)) {
            return NextResponse.json({ message: "You are not a member of this server." }, { status: 403 });
        }

        let newUserServers = existingUserServers.filter((server) => server != serverId);

        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                userServers: newUserServers
            }
        });

        return NextResponse.json({ message: "You have successfully joined the server." }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "an error occured" }, { status: 500 })
    }
}