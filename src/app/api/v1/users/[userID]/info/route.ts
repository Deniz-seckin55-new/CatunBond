import { UserInfo } from "@/app/app/utils/socket_utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET(request: NextRequest, { params }: { params: { userID: string } }) {
    try {
        // const user = await currentUser();
        const { userID } = await params;

        if (!userID) return NextResponse.json({ message: "Missing userID" }, { status: 400 });

        const userInfo = await db.userInfo.findUnique({ where: { userId: userID } });

        if (!userInfo) {
            // Create User Info
            const newUserInfo = await db.userInfo.create({
                data: {
                    userId: userID,
                    biography: "",
                    mainLink: "",
                    shortDescription: "New User!",
                }
            });

            return NextResponse.json({ data: newUserInfo }, { status: 200 });
        }

        return NextResponse.json({ data: userInfo }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}

export async function PUT(request: NextRequest, { params }: { params: { userID: string } }) {
    try {
        // const user = await currentUser();
        const data = await request.json();
        const userinfo: UserInfo = data;
        const { userID } = await params;

        if (!userID) return NextResponse.json({ message: "Missing userID" }, { status: 400 });

        const userInfo = await db.userInfo.findUnique({ where: { userId: userID } });

        if (!userInfo) {
            // Create User Info
            const newUserInfo = await db.userInfo.create({
                data: userinfo,
            });

            return NextResponse.json({ data: newUserInfo }, { status: 200 });
        }

        const newUserInfo = await db.userInfo.update({ where: { userId: userID }, data: userinfo });

        return NextResponse.json({ data: newUserInfo }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}