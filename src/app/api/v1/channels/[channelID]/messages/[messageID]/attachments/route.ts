import { SUPABASE_BUCKET_MAIN_0 } from "@/app/app/utils/constants";
import { JsonAttachments, MessageUpdate } from "@/app/app/utils/socket_utils";
import { getEmitter } from "@/lib/emitter";
import { db } from "@/lib/prisma";
import supabase from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params } : { params: {channelID: string; messageID: string}}) {
    try {
        // const user = await currentUser();
        const { channelID, messageID } = await params;

        const channel = await db.channel.findUnique({where: {id: channelID}});
        if(!channel) return NextResponse.json({message: "Channel Not Found"}, {status: 404});
        
        const message = await db.messages.findUnique({where: {id: messageID}, select: {attachments: true}});
        if(!message) return NextResponse.json({message: "Message Not Found"}, {status: 200});

        const getAttachments = message.attachments;

        return NextResponse.json({data: getAttachments ?? []}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function POST(request: NextRequest, { params } : { params: {channelID: string; messageID: string}}) {
    try {
        const user = await currentUser();
        const { channelID, messageID } = await params;
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];

        if(!files) return NextResponse.json({message: "Files is required"}, {status: 400});
        if(files.length >= 10) return NextResponse.json({message: "You are not allowed to send more than 10 files at the same time"}, {status: 400});

        const fileNameList = files.map(x => x.name);

        const channel = await db.channel.findUnique({where: {id: channelID}, select: {category: {select: {server: {select: {ownerId: true}}}}}});
        if(!channel) return NextResponse.json({message: "Channel Not Found"}, {status: 404});
        
        const message = await db.messages.findUnique({where: {id: messageID}, select: {attachments: true, authorId: true}});
        if(!message) return NextResponse.json({message: "Message Not Found"}, {status: 200});

        if(message.authorId !== user?.id && channel.category?.server.ownerId !== user?.id) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const getAttachments: JsonAttachments = typeof message.attachments === 'string' ? JSON.parse(message.attachments) : [];

        const sameFiles = getAttachments.filter(x => fileNameList.includes(x.filename) && x.publicUrl !== "");

        if(sameFiles.length > 0) {
            return NextResponse.json({message: `Following files already exist: ${sameFiles.join(", ")}`}, {status: 400});
        }

        const newAttachments: JsonAttachments = await Promise.all(files.map(async (file) => {
            const path = `${channelID}/${messageID}/${file.name}`;
            const res = await supabase.storage.from(SUPABASE_BUCKET_MAIN_0).upload(path, file, {contentType: file.type});
            console.log("uploading ",res);
            if(res.error) {
                console.warn("Error uploading ", res.error);
            }
            const pubUrl = supabase.storage.from(SUPABASE_BUCKET_MAIN_0).getPublicUrl(path).data.publicUrl;
            return {    
                filename: file.name,
                publicUrl: pubUrl,
            };
        }));

        const attachments = [...(getAttachments.filter(x => x.publicUrl !== "")), ...newAttachments];

        console.log("Updating attachments ",JSON.stringify(attachments));

        const updateMessage = await db.messages.update({where: {id: messageID}, data: {
            attachments: JSON.stringify(attachments)
        }, select: {
            attachments: true,
            content: true,
            mentions: true,
        }});

        const pulse: MessageUpdate = updateMessage;

        const io = await getEmitter();
        io.to(`CHANNEL_${channelID}`).emit("edit_message", messageID, pulse);

        return NextResponse.json({message: `Successfully uploaded ${files.length === 1 ? "file" : "files"}`}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function DELETE(request: NextRequest, { params } : { params: {channelID: string; messageID: string}}) {
    try {
        // const user = await currentUser();
        const { channelID, messageID } = await params;
        const data = await request.json();
        const fileName: string | undefined = data.fileName;

        if(!fileName) return NextResponse.json({message: "File name is required"}, {status: 400});

        const channel = await db.channel.findUnique({where: {id: channelID}});
        if(!channel) return NextResponse.json({message: "Channel Not Found"}, {status: 404});
        
        const message = await db.messages.findUnique({where: {id: messageID}, select: {attachments: true}});
        if(!message) return NextResponse.json({message: "Message Not Found"}, {status: 200});

        const getAttachments: JsonAttachments = typeof message.attachments === 'string' ? JSON.parse(message.attachments) : [];

        if(!getAttachments.some(x => x.filename === fileName)) return NextResponse.json({message: "File doesn't exist"}, {status: 400});

        await supabase.storage.from(SUPABASE_BUCKET_MAIN_0).remove([`/${channelID}/${messageID}/${fileName}`]);

        const pulse: MessageUpdate = await db.messages.update({where: {id: messageID}, data: {
            attachments: JSON.stringify(getAttachments.filter(x => x.filename !== fileName)),
        }, select: {
            attachments: true,
            content: true,
        }});

        const io = await getEmitter();
        io.to(`CHANNEL_${channelID}`).emit("edit_message", messageID, pulse);

        return NextResponse.json({message: "Successfully deleted file"}, {status: 200});
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}