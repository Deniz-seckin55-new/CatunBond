import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UserVariables } from "@/store/variablesStore";
import { UserVariablesValidSchema } from "@/shared/gschemas";

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const dbUser = await db.user.findUnique({ where: { id: user.id }, select: { variables: true, } });

        if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const getVariables = typeof dbUser.variables === 'string' ? JSON.parse(dbUser.variables) : [];

        return NextResponse.json({ data: getVariables }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const data = await request.json();

        const isVaild = UserVariablesValidSchema.safeParse(data).success;

        if (!isVaild) return NextResponse.json({ message: "Passed JSON is not valid" }, { status: 400 });

        const dbUser = await db.user.findUnique({ where: { id: user.id }, select: { variables: true, } });

        if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const getVariables = typeof dbUser.variables === 'string' ? JSON.parse(dbUser.variables) : [];

        const newVariables = await db.user.update({ where: { id: user.id }, data: { variables: JSON.stringify(data) || '' }, select: { variables: true } });

        return NextResponse.json({ message: "Variables successfully updated", data: newVariables.variables }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}