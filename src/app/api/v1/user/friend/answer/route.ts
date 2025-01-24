import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { requestId, answer } = data;

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "You must be logged in to answer a friend request." }, { status: 401 });
        }

        const friendRequest = await db.friendRequest.findUnique({ where: { id: requestId } });

        if (!friendRequest) {
            return NextResponse.json({ message: "Coudln't find friend request with the id." }, { status: 404 });
        }

        if (friendRequest.receiverId !== user.id && answer !== "cancel") {
            return NextResponse.json({ message: "Only reciever can answer the friend request." }, { status: 401 });
        }

        switch (answer) {
            case "accept":
                await db.user.update({
                    where: { id: friendRequest.senderId }, data: {
                        friends: {
                            connect: {
                                id: friendRequest.receiverId,
                            }
                        }
                    }
                });
                await db.user.update({
                    where: { id: friendRequest.receiverId }, data: {
                        friends: {
                            connect: {
                                id: friendRequest.senderId,
                            }
                        }
                    }
                });
                await db.friendRequest.update({
                    where: { id: requestId }, data: {
                        status: "ACCEPTED"
                    }
                });
                return NextResponse.json({ message: "Successfully accepted friend request." }, { status: 200 });
                break;
            case "decline":
                await db.friendRequest.update({
                    where: { id: requestId }, data: {
                        status: "DECLINED"
                    }
                });
                return NextResponse.json({ message: "Successfully declined friend request." }, { status: 200 });
                break;
            case "cancel":
                await db.friendRequest.update({
                    where: { id: requestId }, data: {
                        status: "CANCELED"
                    }
                });
                return NextResponse.json({ message: "Successfully canceled friend request." }, { status: 200 });
            case "block": 
                await db.friendRequest.update({
                    where: {
                        id: requestId,
                    },
                    data: {
                        status: 'BLOCKED',
                    }
                });
                await db.user.update({where: {id: user.id}, data: {blocked: {push: friendRequest.receiverId}}});
                return NextResponse.json({message: "Successfully blocked friend request."});
            default:
                return NextResponse.json({ message: "Unknown action." }, { status: 400 });
                break;
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}