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

        const blockedUsers = UserIDListToSmallUserList(getUser.blocked, db);

        return NextResponse.json({ data: blockedUsers }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}