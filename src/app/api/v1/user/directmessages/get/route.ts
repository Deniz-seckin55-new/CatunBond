import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const user = await currentUser();
        if (user) {
            const dmData = await db.user.findUnique({ where: { id: user.id } }).directMsgs();
            if (dmData) {
                const _directMessages = dmData.map(async (dm) => ({
                    id: dm.id,
                    name: dm.name,
                    users: await (async () => {
                        const dmUsers = await db.channel.findUnique({ where: { id: dm.id } }).directMsgFor();
                        return dmUsers?.map((dmUser) => ({
                            id: dmUser.id,
                            username: dmUser.username,
                            avatarUrl: dmUser.avatarUrl,
                        }));
                    })()
                }));
                const directMessages = await Promise.all(_directMessages);
                if (data.withUserId) {
                    const newdirectMessages = directMessages.filter(x => x.users?.some(y => y.id === data.withUserId));
                    return NextResponse.json({ data: newdirectMessages[0] }, { status: 200 });
                } else {
                    return NextResponse.json({ data: directMessages }, { status: 200 });
                }
            } else {
                return NextResponse.json({ message: "Couldn't get direct messages." }, { status: 404 });
            }
        } else {
            return NextResponse.json({ message: "You must be logged in to see direct messages." }, { status: 401 });
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}