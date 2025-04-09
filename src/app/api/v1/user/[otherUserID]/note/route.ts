import { UserNote, UserNotes } from "@/app/app/utils/socket_utils";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET(request: NextRequest, { params }: { params: { otherUserID: string } }) {
    try {
        const user = await currentUser();
        const { otherUserID } = await params;
        
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!otherUserID) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

        const getUserNote: (UserNote | null) = await db.userNote.findFirst({where: {userId: user.id, otherUserId: otherUserID}});
        if (!getUserNote) return NextResponse.json({ data: { userId: user.id, otherUserId: otherUserID, note: ""} as UserNote }, { status: 200 });

        return NextResponse.json({ data: getUserNote }, { status: 200 });
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}
export async function PUT(request: NextRequest, { params }: { params: { otherUserID: string } }) {
    try {
        const user = await currentUser();
        const { note } = await request.json();
        const { otherUserID } = await params;
        
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (!otherUserID) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

        const userNoteExists = await db.userNote.findUnique({ where: { userId_otherUserId: { userId: user.id, otherUserId: otherUserID} } });
        if(!userNoteExists) {
            const newUserNote: UserNote = await db.userNote.create({data: {
                otherUserId: otherUserID,
                userId: user.id,
                note: note,
            }});

            return NextResponse.json({ data: newUserNote }, { status: 200 });
        } else {
            const updatedUserNote: UserNote = await db.userNote.update({where: {userId_otherUserId: { userId: user.id, otherUserId: otherUserID }}, data: {note: note}});
            return NextResponse.json({ data: updatedUserNote }, { status: 200 });
        }
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        db.$disconnect();
    }
}