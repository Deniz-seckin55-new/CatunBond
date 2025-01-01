import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const db = new PrismaClient();
    const cUser = await currentUser();

    const user = await db.user.findUnique({ where: { id: cUser!.id } })

    if (!user) {
        redirect('/aftersignup');
        return NextResponse.json({
            redirect: '/aftersignup'
        }, {
            status: 200
        })
    }
    return NextResponse.json({
        redirect: null
    }, {
        status: 200
    })

    db.$disconnect();
} 