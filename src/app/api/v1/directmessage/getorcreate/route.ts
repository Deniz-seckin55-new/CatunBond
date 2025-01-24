import { DirectMessage } from "@/app/app/utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { dmId, name, withUserId } = data;

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "You must be logged in to create/get a Direct Message." }, { status: 403 });
        }

        const channel = await db.channel.findUnique({ where: { id: dmId } });

        if (!channel) {
            const channel = await db.channel.create({
                data: {
                    id: uuid4(),
                    name: name,
                    directMsgFor: {
                        connect: [{ id: withUserId }, { id: user.id }]
                    },
                }
            });
            const directMsgFor = await db.channel.findUnique({where: {id: channel.id}}).directMsgFor();
            const directMessage: DirectMessage = {
                id: channel.id,
                name: channel.name,
                users: directMsgFor!.map(user => ({
                    id: user.id,
                    username: user.username,
                    avatarUrl: user.avatarUrl ?? '',
                })),
            }
            
            return NextResponse.json({ data: directMessage }, { status: 200 });
        } else {
            const directMsgFor = await db.channel.findUnique({ where: { id: dmId } }).directMsgFor();

            if (!directMsgFor) {
                return NextResponse.json({ message: "Couldn't find Direct Message Users." }, { status: 404 });
            }

            const directMessage: DirectMessage = {
                id: channel.id,
                name: channel.name,
                users: directMsgFor.map(user => ({
                    id: user.id,
                    username: user.username,
                    avatarUrl: user.avatarUrl ?? '',
                }))
            }

            return NextResponse.json({ data: directMessage }, { status: 200 });
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}