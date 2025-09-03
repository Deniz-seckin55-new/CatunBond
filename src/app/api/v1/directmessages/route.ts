import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { CreateUserDirectMessageChannel } from "../utils/utils";

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();

        const { withUserId } = data;

        return CreateUserDirectMessageChannel(user, withUserId, db);
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}