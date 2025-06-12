import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function RedirectToAfterSignUp() {
    return NextResponse.json({
        redirect: '/aftersignup'
    }, {
        status: 200
    });
}

function RetrunNull() {
    return NextResponse.json({
        redirect: null
    }, {
        status: 200
    })
}

export async function GET() {
    try {
        const cUser = await currentUser();

        if (!cUser) return RedirectToAfterSignUp();

        const user: boolean = await db.user.count({ where: { id: cUser.id } }) > 0;

        if (!user) return RedirectToAfterSignUp();

        return RetrunNull();
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
    } 
} 