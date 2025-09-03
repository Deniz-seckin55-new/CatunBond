import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GetUserInfo } from "../../../utils/utils";

export async function PATCH(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { serverId, order } = data;

        if (!serverId) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });
        // Order === 0 is Order === false for no reason
        if (order === undefined || order === null) return NextResponse.json({ message: "Order is required" }, { status: 400 });
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const userInfo = await GetUserInfo(db, user.id);
        if (!userInfo) return NextResponse.json({ message: "User Info not found" }, { status: 404 });

        const reordered = [...userInfo.serverListOrder];

        // Remove the item first
        const currentIndex = reordered.findIndex(item => item.serverId === serverId);
        if (currentIndex === -1) {
            return NextResponse.json({ message: "Server not found in order" }, { status: 404 });
        }

        const [movedItem] = reordered.splice(currentIndex, 1);

        // Clamp order value to stay within bounds
        const targetIndex = Math.min(Math.max(order, 0), reordered.length);
        reordered.splice(targetIndex, 0, movedItem);

        // Recalculate indices
        const newOrder = reordered.map((item, index) => ({
            id: item.id,
            serverId: item.serverId,
            index: index,
        }));

        // console.log(newOrder);

        await db.userInfo.update({
            where: { userId: user.id }, data: {
                serverListOrder: {
                    deleteMany: {},
                    createMany: {
                        data: newOrder,
                    },
                }
            }
        });

        return NextResponse.json({ message: "Successfully updated server order" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}