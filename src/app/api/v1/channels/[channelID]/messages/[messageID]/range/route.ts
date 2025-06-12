import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { messageID: string } }) {
    try {
        const { messageID } = await params;
        if (!messageID) {
            return NextResponse.json({ message: 'Message ID is required' }, { status: 400 });
        }

        const upParam = request.nextUrl.searchParams.get('up');
        const downParam = request.nextUrl.searchParams.get('down');
        if (!upParam) {
            return NextResponse.json({ message: 'up is required' }, { status: 400 });
        }
        if (!downParam) {
            return NextResponse.json({ message: 'down is required' }, { status: 400 });
        }

        // parse limits and validate
        const up = parseInt(upParam, 10);
        const down = parseInt(downParam, 10);
        if (Number.isNaN(up) || up < 0 || Number.isNaN(down) || down < 0) {
            return NextResponse.json({ message: 'up/down must be non-negative integers' }, { status: 400 });
        }

        const include = {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true
                }
            },
            channel: {
                select: {
                    id: true,
                    name: true
                }
            },
            repliedTo: {
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true
                        }
                    },
                    channel: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    repliedTo: {
                        select: { id: true } // Depth End
                    }
                },
            }
        };

        // fetch the central message
        const center = await db.messages.findUnique({
            where: { id: messageID },
            include
        });
        if (!center) {
            return NextResponse.json({ message: 'Message not found' }, { status: 404 });
        }

        // in one transaction, get messages before and after
        const [before, after] = await db.$transaction([
            db.messages.findMany({
                where: {
                    channelId: center.channelId,
                    timestamp: { lt: center.timestamp },
                },
                orderBy: { timestamp: 'desc' },
                take: up,
                include
            }),
            db.messages.findMany({
                where: {
                    channelId: center.channelId,
                    timestamp: { gt: center.timestamp },
                },
                orderBy: { timestamp: 'asc' },
                take: down,
                include
            }),
        ]);

        // reverse the “before” array so it’s chronological
        before.reverse();

        return NextResponse.json({
            data: {
                before,
                center,
                after,
            },
        }, {status: 200});
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}