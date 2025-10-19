import { UserInfo } from "@/app/app/utils/socket_utils";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GetUserInfo } from "../../utils/utils";
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const getUserInfo = await GetUserInfo(db, user.id);

        if (!getUserInfo) return NextResponse.json({ message: "User Info not found" }, { status: 404 });

        return NextResponse.json({ data: getUserInfo }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}
export async function PATCH(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const data = await request.json();
        const userInfo: UserInfo = data as UserInfo;

        if (!userInfo) return NextResponse.json({ message: "User Info is required" }, { status: 400 });

        await db.userInfo.update({
            where: { userId: user.id },
            data: {
                ...userInfo,
                serverListOrder: {
                    deleteMany: {},
                    createMany: {
                        data: userInfo.serverListOrder.map((item, index) => ({
                            id: item.id,
                            serverId: item.serverId,
                            index: item.index, // or item.index
                        }))
                    }
                },
            }
        });

        return NextResponse.json({ message: "Successfully updated user info" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}