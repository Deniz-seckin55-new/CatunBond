import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const newCategoryList: {id: string, channels: string[]}[] = data;

        newCategoryList.forEach(async (category, cIndex) => {
            category.channels.forEach(async (channel, cnIndex) => {
                await db.channel.update({where: {id: channel}, data: {index: cnIndex}});
            });
            await db.category.update({where: {id: category.id}, data: {index: cIndex}});
        })

        return NextResponse.json({message: "Successfully reordered all categories and channels"});

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}