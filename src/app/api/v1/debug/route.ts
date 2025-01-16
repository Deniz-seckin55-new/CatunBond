import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";

const db = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            db.$disconnect();
            return;
        }

        /*if(user) {
            (await clerkClient()).users.updateUserMetadata(user.id, {
                privateMetadata: {
                    userServers: [],
                }
            })
        }*/

        /*const s = await db.server.create({
            data: {
                name: "Test Server 2",
                ownerId: user.id,
                iconUrl: "https://cat-storage-server.web.app/data/cat1.jpeg",
                id: uuid4(),
                channels: {
                    create: {
                        name: "general",
                        id: uuid4()
                    }
                }
            }
        });*/

        /* const serverId = "e0e92617-fa44-4f7e-b056-1c477795ee4a";
 
         await db.channel.deleteMany({ where: { serverId } });
         await db.server.delete({ where: { id: serverId } });*/

        const server = await db.server.findFirst({
            where: {
                id: "ee481f36-7871-4fab-8f56-9881eeb7743b"
            }
        });

        const messages = await db.messages.findMany();

        const cl = await clerkClient();
        /*const users = await cl.users.getUserList();
        users.data.forEach(async (user) => {
            await cl.users.deleteUser(user.id);
        });*/

        const servercodes = (await db.server.findMany({ where: {id: {not: "h"}}})).map((s) => s.invites);
        
        /*await db.messages.deleteMany({ where: { authorId: { not: ";" } } });*/
        /*await db.auth.deleteMany({ where: { userId: { not: { contains: ";" } } } });
        await db.user.deleteMany({ where: { id: { not: { contains: ";" } } } });*/

        const servers = await db.server.findMany();

        const count = await db.server.count();

        await db.$disconnect();
        return NextResponse.json({
            message: servercodes
        }, { status: 200 })
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured" }, { status: 500 })
    }
}
