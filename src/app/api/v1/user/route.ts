import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
/// INCOMPLETE:
// To Do:
// 1. Add server Join/leave
// 2. Direct Messages Join/leave
// 3. Friend Request Send/Action
// 4. Is there friend removing?
// 5. User Info Get/Update
// 6. Check if implementing server|dm join/leave is necessary or have I already coded it inside /api/v1/servers /api/v1/directmessages
// 7. After all re-code all fetch API calls in the client side to use this API instead of the old one.
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const DBuser = await db.user.findUnique({
            where: { id: user.id }, select: {
                id: true,
                friends: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                receivedRequests: {
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
                        },
                    }
                },
                sentRequests: {
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
                        },
                    }
                },
                directMsgs: {
                    select: {
                        id: true,
                        directMsgFor: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            },
                        },
                        channelType: true,
                    }
                },
                servers: {
                    select: {
                        categories: {
                            include: {
                                channels: {
                                    select: {
                                        id: true,
                                        name: true,
                                        channelType: true,
                                    }
                                },
                            }
                        },
                        id: true,
                        iconUrl: true,
                        members: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        },
                        name: true,
                        ownerId: true,
                    }
                },
                username: true,
                avatarUrl: true,
                blocked: true,
            }
        });

        if (!DBuser) return NextResponse.json({ message: "User not found" }, { status: 404 });
        // This is a problem.

        return NextResponse.json({ data: DBuser }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function PUT(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const { avatarUrl } = await request.json();

        if (!avatarUrl) return NextResponse.json({ message: "Bad Request" }, { status: 400 });

        await db.user.update({ where: { id: user.id }, data: { avatarUrl: avatarUrl } });

        return NextResponse.json({ message: "User updated" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}