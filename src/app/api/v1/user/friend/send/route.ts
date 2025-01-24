import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { friendId } = data;

        const user = await currentUser();
        if(!user) {
            return NextResponse.json({message: "You must be logged in to send a friend request."}, {status: 401});
        }

        const friend = await db.user.findUnique({where: {id: friendId}});
        
        if(!friend) {
            return NextResponse.json({message: "Coudln't find friend with the id."}, {status: 404});
        }

        if(friendId === user.id) {
            return NextResponse.json({message: "Cannot send friend invite to self."}, {status: 400});
        }

        if(friend.blocked.includes(user.id)) {
            return NextResponse.json({message: "Cannot send friend invite to user whom has blocked you."}, {status: 400});
        }

        if((await db.user.findUnique({where: {id: user.id}}).sentRequests())?.some(x => (x.receiverId === friendId && x.status === "PENDING"))) {
            return NextResponse.json({message: "Already sent friend request to user."}, {status: 400});
        }

        await db.user.update({where: {id: user.id}, data: {
            sentRequests: {
                create: {
                    receiver: {
                        connect: {id: friendId,}
                    }
                }
            }
        }});

        const friendRequest = await db.friendRequest.findFirst({
            where: {
                senderId: user.id,
                receiverId: friendId,
            }
        })

        return NextResponse.json({data: friendRequest, message: "Successfully sent friend request."}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}