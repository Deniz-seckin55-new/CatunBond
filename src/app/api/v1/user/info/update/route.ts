import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient, UserInfo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GenerateUserInfo } from "../../../utils/utils";

const db = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const data = await request.json();
        const { biography, } = data;

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "You must be logged in to get your information." }, { status: 403 });
        }

        const info = db.userInfo.findUnique({ where: { userId: user.id } });
        if (!info) {
            await GenerateUserInfo(db, user.id);
        }

        await db.userInfo.update({
            where: { userId: user.id }, data: {
                biography: biography,
            }
        });

        return NextResponse.json({ message: "Successfully updated User Info." });


    } catch (err) {
        if (err instanceof Error)
            console.log(err);
    } finally {
        db.$disconnect();
    }
}