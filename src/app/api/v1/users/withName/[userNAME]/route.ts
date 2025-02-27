import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { userNAME: string } }) {
    try {
        const user = await currentUser();
        const { userNAME } = await params;

        const getUser = await db.user.findUnique({ where: { username: userNAME }, select: { id: true, username: true, avatarUrl: true } });

        if (!getUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ data: getUser }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}