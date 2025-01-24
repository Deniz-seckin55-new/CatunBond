import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        if(!user) {
            return NextResponse.json({message: "You must be logged in to answer a friend request."}, {status: 401});
        }
        
        const friendsList = await db.user.findUnique({where: {id: user.id}}).friends();

        if(!friendsList) {
            return NextResponse.json({message: "Coulnd't get user friends"});
        }

        return NextResponse.json({data: friendsList}, {status: 200});

    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}