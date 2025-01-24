import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { dmId } = data;
        if(!user) {
            return NextResponse.json({message: "You must be logged in to see direct messages."}, {status: 401});
        }

        const dm = await db.channel.findUnique({where: {id: dmId}});

        if(!dm) {
            return NextResponse.json({message: "Couldn't get DM."}, {status: 404});
        }

        if(dm?.serverId !== null) {console.warn("Direct Message server ID is not null.");}

        await db.user.update({where: {id: user.id}, data: {
            directMsgs: {
                connect: {
                    id: dmId,
                }
            }
        }});

        return NextResponse.json({message: "Successfully joined Direct Message."}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({message: "Server error."}, {status: 500});
    } finally {
        db.$disconnect();
    }
}