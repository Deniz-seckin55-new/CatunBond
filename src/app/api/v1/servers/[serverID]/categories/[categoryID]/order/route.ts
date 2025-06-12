import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { serverID: string, categoryID: string } }) {
    try {
        const user = await currentUser();
        const { serverID, categoryID } = await params;
        const data = await request.json();
        const { order } = data; // order = newIndex

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!order) return NextResponse.json({ message: "Missing order" }, { status: 400 });



        // Fetch all categories for the server ordered by current order
        const categories = await db.category.findMany({
            where: { serverId: serverID },
            orderBy: { index: "asc" },
        });

        const categoryToMove = categories.find((cat) => cat.id === categoryID);
        if (!categoryToMove) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        const oldIndex = categories.findIndex((cat) => cat.id === categoryID);
        if (oldIndex === -1) {
            return NextResponse.json({ message: "Category index not found" }, { status: 404 });
        }

        // Remove the category from its old position and insert it into the new index
        categories.splice(oldIndex, 1);
        categories.splice(order, 0, categoryToMove);

        // Reassign order values
        const updatePromises = categories.map((cat, index) => {
            if (cat.index !== (index)) {
                return db.category.update({
                    where: { id: cat.id },
                    data: { index },
                });
            }
        });

        await Promise.all(updatePromises);

        return NextResponse.json({ message: "Order updated successfully" }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}