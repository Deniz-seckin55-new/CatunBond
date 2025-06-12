import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { friendrequestID: string } }) {
    try {
        const user = await currentUser();
        const { friendrequestID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getFriendRequest = await db.friendRequest.findUnique({ where: { id: friendrequestID } });

        if (!getFriendRequest) return NextResponse.json({ message: "Friend Request not found" }, { status: 404 });

        return NextResponse.json({ data: getFriendRequest }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}
export async function PATCH(request: NextRequest, { params }: { params: { friendrequestID: string } }) {
    try {
        const user = await currentUser();
        const { friendrequestID } = await params;
        const data = await request.json();
        const { answer } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!answer) return NextResponse.json({ message: "Answer is required" }, { status: 400 });

        const getFriendRequest = await db.friendRequest.findUnique({ where: { id: friendrequestID } });
        if (!getFriendRequest) return NextResponse.json({ message: "Friend Request not found" }, { status: 404 });

        if (getFriendRequest.receiverId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        switch (answer) {
            case "ACCEPT":
                await db.user.update({
                    where: { id: user.id }, data: {
                        friends: {
                            connect: {
                                id: getFriendRequest.receiverId,
                            }
                        }
                    }
                });

                await db.user.update({
                    where: { id: getFriendRequest.receiverId }, data: {
                        friends: {
                            connect: {
                                id: user.id,
                            }
                        }
                    }
                });

                await db.friendRequest.update({ where: { id: friendrequestID }, data: { status: "ACCEPTED" } });
                return NextResponse.json({ message: "Friend Request Accepted" }, { status: 200 });
            case "DECLINE":
                await db.friendRequest.update({ where: { id: friendrequestID }, data: { status: "DECLINED" } });
                return NextResponse.json({ message: "Friend Request Declined" }, { status: 200 });
            case "CANCEL":
                await db.friendRequest.update({ where: { id: friendrequestID }, data: { status: "CANCELED" } });
                return NextResponse.json({ message: "Friend Request Canceled" }, { status: 200 });
                break;
            case "BLOCK":
                await db.user.update({
                    where: { id: user.id }, data: {
                        blocked: {
                            push: getFriendRequest.receiverId,
                        }
                    }
                })

                await db.friendRequest.update({ where: { id: friendrequestID }, data: { status: "BLOCKED" } });
                return NextResponse.json({ message: "Friend Request Blocked" }, { status: 200 });
            default:
                return NextResponse.json({ message: "Invalid Action" }, { status: 400 });
        }

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}