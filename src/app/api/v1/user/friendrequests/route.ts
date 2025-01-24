import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        if(!user) {
            return NextResponse.json({message: "You must be logged in to view friend requests."}, {status: 401});
        }
        
        const friendSentRequestsList = await db.user.findUnique({where: {id: user.id}}).sentRequests();

        if(!friendSentRequestsList) {
            return NextResponse.json({message: "Coulnd't get user friend requests"});
        }

        const friendRecievedRequestsList = await db.user.findUnique({where: {id: user.id}}).receivedRequests();

        if(!friendRecievedRequestsList) {
            return NextResponse.json({message: "Coulnd't get user friend requests"});
        }

        return NextResponse.json({data: {sent: friendSentRequestsList, recieved: friendRecievedRequestsList}}, {status: 200});

    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}