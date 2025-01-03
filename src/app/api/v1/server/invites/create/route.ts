import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// function to... generate random string of characters :yeppers:
function genInvite(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890'
    let str: string = '';
    for (let i = 0; i < length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return str;

}

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    // Getting resquest data, turning into a json
    // destructuring it's data, blah blah blah the usual

    const data = await req.json();
    const { serverId } = data
    try {
        const server = await db.server.findFirst({
            where: {
                id: serverId
            },
        })
        // Finding a server based on one of it's many invites could look something like this 
        /* db.server.findFirst({
            where: {
                invites: {
                    has: ''
                }
            }
        }) */

        if(!server) {
            return NextResponse.json({ message: "Server not found" }, { status: 404 })
        }

        // Get user
        const user = await currentUser();

        if(!user) {
            return NextResponse.json({ message: "You need to be logged in to use this feature" }, { status: 401 })
        }

        if (user.id !== server.ownerId) {
            return NextResponse.json({ message: "you are not the server owner and thus cannot create invites" }, { status: 401 })
        }

        //get the server's invite away and push your new invite to it.
        // Might make a fancy function for it. idk
        const serverInvite = genInvite(8)+Date.now().toString().slice(-2);
        server.invites.push(serverInvite); // Reason for adding the last two chars of Date.now() is it provides very random digits in short-term but in a long-term there can be many equals

        // update server with new invites
        await db.server.update({
            where: {
                id: serverId
            },
            data: {
                invites: server.invites
            }
        })

        // return a 200 yippe
        return NextResponse.json({ message: 'invite created', invite: serverInvite }, { status: 200 })

    } catch (e) {

        // TODO: More error handling 
        if (e instanceof Error) {
            console.log(e.stack)
        }
        return NextResponse.json({
            message: "Something went wrong, please try again"
        }, { status: 500 })
    }
}