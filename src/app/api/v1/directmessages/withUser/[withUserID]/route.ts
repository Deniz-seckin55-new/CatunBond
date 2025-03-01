import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { withUserID: string } }) {
    try {
        const user = await currentUser();
        const { withUserID } = await params;

        if (!withUserID) return NextResponse.json({ message: "Missing withUserID" }, { status: 400 });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const withUserExists: boolean = await db.user.count({ where: { id: withUserID } }) > 0;

        if (!withUserExists) return NextResponse.json({ message: "With User not found" }, { status: 404 });

        const getDirectMessage = await db.channel.findFirst({
            where: {
                AND: [
                    { directMsgFor: { some: { id: user.id } } },
                    { directMsgFor: { some: { id: withUserID } } },
                ]
            },
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
        });

        if (getDirectMessage)
            return NextResponse.json({ data: getDirectMessage }, { status: 200 });
        else {
            const newDirectMessage = await db.channel.create({
                data: {
                    channelType: "DIRECTMESSAGE",
                    name: '',
                    directMsgFor: {
                        connect: [{ id: withUserID }, { id: user.id }]
                    },
                },
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
            });

            return NextResponse.json({ data: newDirectMessage }, { status: 200 });
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { withUserID: string } }) {
    try {
        const user = await currentUser();
        const { withUserID } = await params;

        if (!withUserID) return NextResponse.json({ message: "Missing withUserID" }, { status: 400 });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const withUserExists: boolean = await db.user.count({ where: { id: withUserID } }) > 0;

        if (!withUserExists) return NextResponse.json({ message: "With User not found" }, { status: 404 });

        const getDirectMessage = await db.channel.findFirst({
            where: {
                directMsgFor: {
                    every: {
                        id: {
                            in: [user.id, withUserID]
                        }
                    }
                }
            }
        });

        if (!getDirectMessage) return NextResponse.json({ message: "Direct Message not found" }, { status: 404 });

        await db.channel.delete({ where: { id: getDirectMessage.id } });

        return NextResponse.json({ message: "Direct Message deleted successfully" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}