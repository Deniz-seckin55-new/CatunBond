import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getUserDirectMessages = await db.user.findUnique({
            where: { id: user.id }, select: {
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
                }
            }
        });

        if (!getUserDirectMessages) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ data: getUserDirectMessages.directMsgs }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

// POST/DELETE request is in /directmessages/withUser/