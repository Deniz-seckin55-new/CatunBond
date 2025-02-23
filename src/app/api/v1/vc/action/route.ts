import { VoiceChatInformation } from "@/app/app/utils/socket_utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();

        const data = await req.json();
        const action: string = data.action;
        const vc: VoiceChatInformation = data.vc;

        if (!user) return NextResponse.json({ message: "You must be logged in to do an action on VC" }, { status: 401 });

        console.log("POST /api/v1/vc/action", action, vc.id);

        const DBvc = await db.voiceChat.findUnique({
            where: {
                channelId: vc.id
            }
        });
        
        console.log(DBvc);
        if (!DBvc) {
            return NextResponse.json({ message: "Voice chat on channel not found" }, { status: 404 });
        }

        switch (action) {
            case "join":
                const newDBvc = await db.voiceChat.update({
                    where: { channelId: vc.id }, data: {
                        members: {
                            connect: {
                                id: user.id,
                            }
                        }
                    },
                    include: {
                        members: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        },
                    }
                });

                return NextResponse.json({ data: newDBvc, message: "Voice chat joined successfully" }, { status: 200 });
            case "leave":
                    await db.voiceChat.update({
                        where: { channelId: vc.id }, data: {
                            members: {
                                disconnect: {
                                    id: user.id,
                                }
                            }
                        }
                    });

                    return NextResponse.json({ message: "Voice chat left successfully" }, { status: 200 });
            default:
                break;
        }
    } catch (err) {
        if (err instanceof Error)
            console.error(err.stack);
        return NextResponse.json({message: "Server Error"}, {status: 400})
    } finally {
        db.$disconnect();
    }
}