import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { channelID: string } }
) {
    try {
        const user = await currentUser();
        const { channelID } = params;
        const data = await request.json();
        const { newCategoryId, order: newIndex } = data;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!newCategoryId || typeof newIndex !== "number") {
            return NextResponse.json({ message: "Missing or invalid input" }, { status: 400 });
        }

        const channelToMove = await db.channel.findUnique({
            where: { id: channelID },
        });

        if (!channelToMove) {
            return NextResponse.json({ message: "Channel not found" }, { status: 404 });
        }

        const oldCategoryId = channelToMove.categoryId;

        // 🐾 Step 1: Remove from old category (if it exists)
        if (oldCategoryId) {
            const oldCategoryChannels = await db.channel.findMany({
                where: { categoryId: oldCategoryId },
                orderBy: { index: "asc" },
            });

            const oldIndex = oldCategoryChannels.findIndex((ch) => ch.id === channelID);
            if (oldIndex !== -1) {
                oldCategoryChannels.splice(oldIndex, 1);
                await Promise.all(
                    oldCategoryChannels.map((ch, idx) =>
                        db.channel.update({
                            where: { id: ch.id },
                            data: { index: idx },
                        })
                    )
                );
            }
        }

        // 🐾 Step 2: Insert into new category at newIndex
        const targetCategoryChannels = await db.channel.findMany({
            where: { categoryId: newCategoryId },
            orderBy: { index: "asc" },
        });

        // Insert the channel into the list
        targetCategoryChannels.splice(newIndex, 0, {
            ...channelToMove,
            categoryId: newCategoryId,
        });

        // 🐾 Step 3: Reindex + update all affected channels
        const updateOps = targetCategoryChannels.map((ch, idx) => {
            return db.channel.update({
                where: { id: ch.id },
                data: {
                    index: idx,
                    categoryId: newCategoryId, // update in case it's the moved channel
                },
            });
        });

        await Promise.all(updateOps);

        return NextResponse.json({ message: "Channel moved successfully!" });
    } catch (err) {
        console.error("PATCH channel move error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}