import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            db.$disconnect();
            return NextResponse.json({ message: "You must be logged in to view your servers." }, { status: 401 })
        }
        
        const servers = await (await (db.user.findUnique({where: {id: user.id}}).servers()));

        const serverIds = servers?.map(server => server.id);

        db.$disconnect();
        return NextResponse.json({ data: serverIds }, { status: 200 });
    } catch (err) {
        db.$disconnect();
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "an error occured" }, { status: 500 })
    }
}