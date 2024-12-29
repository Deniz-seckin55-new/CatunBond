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
        
         /*await db.server.create({
             data: {
                 name: "Test Server",
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

        await db.user.deleteMany({
            where: {
                directMsgs: {
                    not: {
                        name: " "
                    }
                }
            }
        });

        await db.$disconnect();
        return NextResponse.json({
            message: "Done."
        }, { status: 200 })
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack)
        await db.$disconnect()
        return NextResponse.json({ message: "an error occured while deleteing the server" }, { status: 500 })
    }
}
