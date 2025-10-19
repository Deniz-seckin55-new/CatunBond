import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cUser = await currentUser();

        if (!cUser) {
            return NextResponse.json({
                redirect: '/aftersignup'
            }, {
                status: 200
            });
        }

        const user: boolean = await db.user.count({ where: { id: cUser.id } }) > 0;

        if (!user) {
            return NextResponse.json({
                redirect: '/aftersignup'
            }, {
                status: 200
            });
        }

        return NextResponse.json({
            redirect: null
        }, {
            status: 200
        })
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);

        return NextResponse.json({
            redirect: '/aftersignup'
        }, {
            status: 200
        });
    }
} 