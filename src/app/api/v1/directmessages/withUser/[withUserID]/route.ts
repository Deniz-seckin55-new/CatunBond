import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
const user = await currentUser();
export async function GET(request: NextRequest, { params }: { params: { withUserID: string } }) {
    try {
        const { withUserID } = params;

        if(!withUserID) return NextResponse.json({ message: "Missing withUserID" }, { status: 400 });

        if(!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const withUserExists: boolean = await db.user.count({ where: { id: withUserID } }) > 0;

        if(!withUserExists) return NextResponse.json({ message: "With User not found" }, { status: 404 });

        const getDirectMessage = await db.channel.findFirst({ where: {
            directMsgFor: {
                every: {
                    id: {
                        in: [user.id, withUserID]
                    }
                }
            }
        }});

        if(getDirectMessage)
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
                include: {
                    directMsgFor: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true
                        }
                    },
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