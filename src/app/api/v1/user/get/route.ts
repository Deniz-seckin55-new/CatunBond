import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, id } = data;
        if(name) {
            const user = await db.user.findFirst({where: {username: name}});
            if(!user) {
                return NextResponse.json({message: "Coudln't find user with username."}, {status: 404});
            }
            return NextResponse.json({data: user}, {status: 200});
        } else if(id) {
            const user = await db.user.findFirst({where: {id: id}});
            if(!user) {
                return NextResponse.json({message: "Coudln't find user with id."}, {status: 404});
            }
            return NextResponse.json({data: user}, {status: 200});
        }
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}