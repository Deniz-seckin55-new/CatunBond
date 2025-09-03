import { getEmitter } from "@/lib/emitter";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getUserFriendRequests = await db.friendRequest.findMany({
            where: {
                OR: [
                    { senderId: user.id },
                    { receiverId: user.id },
                ]
            },
            select: {
                createdAt: true,
                id: true,
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                receiverId: true,
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                senderId: true,
                status: true,
                updatedAt: true,
            }
        });

        if (!getUserFriendRequests) return NextResponse.json({ message: "No friend requests found" }, { status: 404 });

        return NextResponse.json({ data: getUserFriendRequests }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { friendId } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!friendId) return NextResponse.json({ message: "Friend ID is required" }, { status: 400 });

        const getUser = await db.user.findUnique({ where: { id: user.id } });
        const getFriend = await db.user.findUnique({ where: { id: friendId } });

        if (!getUser) return NextResponse.json({ message: "User not found" }, { status: 404 });
        if (!getFriend) return NextResponse.json({ message: "Friend not found" }, { status: 404 });

        if (user.id === friendId) return NextResponse.json({ message: "You cannot send a friend request to yourself" }, { status: 400 });

        const AlreadyFriends = await db.user.count({ where: { id: user.id, friends: { some: { id: friendId } } } }) > 0;
        if (AlreadyFriends) return NextResponse.json({ message: "You are already friends with this user" }, { status: 400 });

        if (getUser.blocked.includes(friendId)) return NextResponse.json({ message: "You cannot send a friend request to a user you have blocked" }, { status: 400 });
        if (getFriend.blocked.includes(user.id)) return NextResponse.json({ message: "You cannot send a friend request to a user who has blocked you" }, { status: 400 });

        const getFriendRequest = await db.friendRequest.findFirst({
            where: {
                senderId: user.id,
                receiverId: friendId,
                status: "PENDING",
            }
        });

        if (getFriendRequest) return NextResponse.json({ message: "Friend request already sent" }, { status: 400 });

        const newFriendRequest = await db.friendRequest.create({
            data: {
                receiver: {
                    connect: { id: friendId }
                },
                sender: {
                    connect: { id: user.id }
                },
                status: "PENDING",
            },
            include: {
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                }
            }
        });

        console.log("New FR ",JSON.stringify(newFriendRequest));

        getEmitter().then(io => {
            io.to("USER_"+friendId).emit("friend_request_send", newFriendRequest);
        });

        return NextResponse.json({ data: newFriendRequest }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}