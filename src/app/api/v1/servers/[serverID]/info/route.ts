import { ServerInfo } from "@/app/app/utils/socket_utils";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const { serverID } = await params;

        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const serverExists = await db.server.findUnique({ where: { id: serverID } });

        if (!serverExists) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        const getServerInfo = await db.serverInfo.findUnique({ where: { serverId: serverID } });

        if (!getServerInfo) {
            const newServerInfo = await db.serverInfo.create({
                data: {
                    serverId: serverID,
                    name: serverExists.name,
                    maxUsers: 50,
                    color: "#F0F7EE",
                    description: "",
                    rules: [],
                    iconUrl: serverExists.iconUrl,
                }
            })
            
            return NextResponse.json({ data: newServerInfo }, { status: 200 });
        } else {
            return NextResponse.json({ data: getServerInfo }, { status: 200 });
        }

    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}

export async function PATCH(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const { serverID } = await params;
        const data = await request.json();
        const serverInfo: ServerInfo = data;

        if (!serverID) return NextResponse.json({ message: "Server ID is required" }, { status: 400 });

        const serverExists = await db.server.findUnique({ where: { id: serverID } });

        if (!serverExists) return NextResponse.json({ message: "Server not found" }, { status: 404 });

        const patchServerInfo = await db.serverInfo.update({where: {serverId: serverID}, data: serverInfo});

        if(!patchServerInfo) return NextResponse.json({ message: "Patched Server Info not found"});

        await db.server.update({where: {id: serverID}, data: {name: serverInfo.name, iconUrl: serverInfo.iconUrl, }});

        return NextResponse.json({ data: patchServerInfo }, { status: 200 });
    } catch (err) {
        if (err instanceof Error)
            console.log(err.stack);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } 
}