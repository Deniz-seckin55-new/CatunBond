import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ message: "You must be logged in to view your servers." }, { status: 401 })
        }

        if (user.privateMetadata.userServers) {
            return NextResponse.json({ data: user.privateMetadata.userServers }, { status: 200 });
        } else {
            const client = await clerkClient();;
            client.users.updateUserMetadata(user.id, {
                privateMetadata: {
                    userServers: [],
                }
            });
            return NextResponse.json({ data: [] }, { status: 200 });
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "an error occured" }, { status: 500 })
    }
}