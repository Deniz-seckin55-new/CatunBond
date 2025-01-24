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
        const friend = await db.user.findUnique({where: {id: user.id}});

        if(!friend || !friend.blocked) {
            return NextResponse.json({message: "Coulnd't get user's friend"});
        }

        const _blockedList = friend.blocked.map(async (blockedUser) => {
            const user = await db.user.findUnique({where: {id: blockedUser}});
            return {
                username: user?.username,
                id: user?.id,
                avatarUrl: user?.avatarUrl,
            }
        });

        const blockedUsers = await Promise.all(_blockedList);

        return NextResponse.json({data: blockedUsers}, {status: 200});

    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}