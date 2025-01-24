import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GenerateUserInfo } from "../../../utils/utils";

const db = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if(!user) {
            return NextResponse.json({message: "You must be logged in to get your information."}, {status: 403});
        }

        const info = db.userInfo.findUnique({where: {userId: user.id}});
        if(!info) {
            const userInfo = GenerateUserInfo(db, user.id);
            return NextResponse.json({data: userInfo}, {status: 200});
        } else {
            return NextResponse.json({data: info}, {status: 200});
        }

    } catch (err) {
        if(err instanceof Error)
            console.log(err);
    } finally {
        db.$disconnect();
    }
}