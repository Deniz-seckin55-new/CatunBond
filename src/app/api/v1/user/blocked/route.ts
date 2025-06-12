import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { UserIDListToSmallUserList } from "../../utils/utils";
import { db } from "@/lib/prisma";
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getUser = await db.user.findUnique({ where: { id: user.id } });

        if (!getUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const blockedUsers = await UserIDListToSmallUserList(getUser.blocked, db);

        return NextResponse.json({ data: blockedUsers }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}
export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const blockUserId = data;
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });


        const getUser = await db.user.findUnique({ where: { id: user.id } });

        if (!getUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (getUser.blocked.includes(blockUserId)) {
            return NextResponse.json({ message: "User already blocked" }, { status: 400 });
        }

        const blockUser = await db.user.findUnique({ where: { id: blockUserId } });

        if (!blockUser) return NextResponse.json({ message: "Block User not found" }, { status: 404 });

        if (blockUser.blocked.includes(user.id)) {
            await db.user.update({ where: { id: user.id }, data: { blocked: { push: blockUserId } } });
            return NextResponse.json({ message: "User already blocked" }, { status: 400 });
        }

        await db.user.update({ where: { id: user.id }, data: { blocked: { push: blockUserId } } });
        await db.user.update({ where: { id: blockUserId }, data: { blocked: { push: user.id } } });

        return NextResponse.json({ message: "Successfully blocked user" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}