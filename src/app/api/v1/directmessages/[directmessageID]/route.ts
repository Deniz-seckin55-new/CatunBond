import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { directmessageID: string } }) {
    try {
        const { directmessageID } = await params;

        if (!directmessageID) return NextResponse.json({ message: "Missing directmessageID" }, { status: 400 });

        const directMessageExists: boolean = await db.channel.count({ where: { id: directmessageID } }) > 0;

        if (!directMessageExists) return NextResponse.json({ message: "Direct Message not found" }, { status: 404 });

        const getDirectMessage = await db.channel.findUnique({
            where: {
                id: directmessageID
            },
            include: {
                directMsgFor: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        });

        return NextResponse.json({ data: getDirectMessage }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function DELETE(request: NextRequest, { params }: { params: { directmessageID: string } }) {
    try {
        const { directmessageID } = await params;

        if(!directmessageID) return NextResponse.json({ message: "Missing directmessageID" }, { status: 400 });

        const directMessageExists: boolean = await db.channel.count({ where: { id: directmessageID } }) > 0;

        if(!directMessageExists) return NextResponse.json({ message: "Direct Message not found" }, { status: 404 });

        await db.channel.delete({where: { id: directmessageID }});

        return NextResponse.json({ message: "Direct Message deleted" }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

// Direct Messages cannot be updated since the only parameter is the withUser and it should not be changed.
// export async function PUT(request: NextRequest, { params }: { params: { directmessageID: string } }) {
//     try {
//         const { directmessageID } = await params;

//         if(!directmessageID) return NextResponse.json({ message: "Missing directmessageID" }, { status: 400 });

//         const data = await request.json();
//         const { name } = data;

//         if(!name) return NextResponse.json({ message: "Missing name" }, { status: 400 });

//         const directMessageExists: boolean = await db.channel.count({ where: { id: directmessageID } }) > 0;

//         if(!directMessageExists) return NextResponse.json({ message: "Direct Message not found" }, { status: 404 });

//         const updatedDirectMessage = await db.channel.update({
//             where: {
//                 id: directmessageID
//             },
//             data: {
//                 name
//             }
//         });

//         return NextResponse.json({ data: updatedDirectMessage }, { status: 200 });
//     } catch (err) {
//         if (err instanceof Error)
//             console.log(err.stack);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     } finally {
//         db.$disconnect();
//     }
// }