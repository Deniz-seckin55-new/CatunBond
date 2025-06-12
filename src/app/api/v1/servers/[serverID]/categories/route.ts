import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const { serverID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const getCategories = await db.server.findUnique({
            where: { id: serverID },
            select: {
                categories: {
                    include: {
                        channels: {
                            select: {
                                id: true,
                                name: true,
                                categoryId: true,
                                channelType: true,
                            }
                        },
                    },
                    orderBy: {
                        index: "asc",
                    }
                },
            }
        });

        if (!getCategories) return NextResponse.json({ message: "Server not found" }, { status: 400 });

        return NextResponse.json({data: getCategories.categories}, {status: 200});
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function POST(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const user = await currentUser();
        const data = await request.json();
        const { name } = data;
        const { serverID } = await params;

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });
        if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

        const serverExists: boolean = await db.server.count({where: {id: serverID}}) > 0;

        if (!serverExists) return NextResponse.json({ message: "Server not found" }, { status: 400 });

        const newCategory = await db.category.create({
            data: {
                name: name,
                server: {
                    connect: {
                        id: serverID,
                    }
                }
            },
            include: {
                channels: true,
            }
        })

        return NextResponse.json({data: newCategory}, {status: 200});
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}