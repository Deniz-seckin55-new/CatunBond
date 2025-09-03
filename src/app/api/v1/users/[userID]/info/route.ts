import { UserInfo } from "@/app/app/utils/socket_utils";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GetUserInfo } from "../../../utils/utils";
export async function GET(request: NextRequest, { params }: { params: { userID: string } }) {
    try {
        // const user = await currentUser();
        const { userID } = await params;

        if (!userID) return NextResponse.json({ message: "Missing userID" }, { status: 400 });

        const userInfo = await GetUserInfo(db, userID);

        if (!userInfo) return NextResponse.json({ message: "User Info not found" }, { status: 404 });

        return NextResponse.json({ data: {...userInfo, serverListOrder: undefined} }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function PUT(request: NextRequest, { params }: { params: { userID: string } }) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const userinfo: UserInfo = data;
        const { userID } = await params;

        if (!userID) return NextResponse.json({ message: "Missing userID" }, { status: 400 });
        if(!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!userinfo) return NextResponse.json({ message: "User Info is required" }, { status: 400 });
        if(user.id !== userID) return NextResponse.json({ message: "You can only update your own user info" }, { status: 403 });

        const getUserInfo = await GetUserInfo(db, userID);

        if(!getUserInfo) return NextResponse.json({ message: "User Info not found" }, { status: 404 });

        const newUserInfo = await db.userInfo.update({
            where: { userId: userID }, data: {
                ...userinfo, serverListOrder: {
                    deleteMany: {},
                    createMany: {
                        data: getUserInfo.serverListOrder.map((item, index) => ({
                            id: item.id,
                            serverId: item.serverId,
                            index: item.index, // or item.index,
                        }))
                    }
                }
            }
        });

        return NextResponse.json({ data: newUserInfo }, { status: 200 });

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}