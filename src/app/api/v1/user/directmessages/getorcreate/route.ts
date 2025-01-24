import { DirectMessage } from "@/app/app/utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { withUserId, name } = data;

        if(!withUserId || !name) {
            return NextResponse.json({message: "withUserId or name not provided."}, {status: 400});
        }

        const user = await currentUser();

        if(!user) {
            return NextResponse.json({message: "You must be logged in to get/create a Direct Message."}, {status: 403});
        }

        const dm = await db.channel.findFirst({where: {
            AND: [
                {directMsgFor: {some: {id: user.id}}} ,
                {directMsgFor: {some: {id: withUserId}}} ,
            ]
        }});

        if(dm) {
            const directMessage: DirectMessage = {
                id: dm.id,
                name: dm.name,
                users: [{
                    id: user.id,
                    username: user.username ?? '',
                    avatarUrl: user.imageUrl,
                }],
            };
            return NextResponse.json({data: directMessage}, {status: 200});
        } else {
            const newDM = await db.channel.create({
                data: {
                    id: uuid4(),
                    name: name,
                    directMsgFor: {
                        connect: [
                            {id: user.id},
                            {id: withUserId},
                        ]
                    }
                }
            });
            return NextResponse.json({data: newDM}, {status: 200});
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}