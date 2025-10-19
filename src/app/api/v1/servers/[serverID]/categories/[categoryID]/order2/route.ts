import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const BATCH_SIZE = 25;
export async function PUT(request: NextRequest, { params }: { params: { categoryID: string } }) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const order: string[] = data;
        const { categoryID } = await params;

        const getCategory = await db.category.findUnique({ where: { id: categoryID }, select: { channels: true } });
        if (!getCategory) return NextResponse.json({ message: "Category not found" }, { status: 404 });

        const _newChannelOrder = order.map((channelId, index) => {
            const newChannel = getCategory.channels.find(x => x.id === channelId);

            if (!newChannel) {
                console.warn("No channel for id, ", channelId, " Skipping");
                return undefined;
            } else {
                return { id: channelId, index: index };
            }
        }).filter(x => x !== undefined);

        for (let i = 0; i < order.length; i += BATCH_SIZE) {
            const batch = order.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map((channelId, j) =>
                    db.channel.update({
                        where: { id: channelId },
                        data: { index: i + j }, // i + j = global index
                    })
                )
            );
        }

        return NextResponse.json({ message: "Successfully reordered channels." });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}