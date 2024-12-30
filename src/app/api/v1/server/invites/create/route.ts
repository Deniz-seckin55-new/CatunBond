import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// function to... generate random string of characters :yeppers:
function genInvite(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890'
    let str: string = '';
    for(let i = 0; i <  length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return str;

}

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    // Getting resquest data, turning into a json
    // destructuring it's data, blah blah blah the usual
    const data = await req.json();
    const {serverId, requesterId, ownerId} = data
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

        if(requesterId !== ownerId) {
            return NextResponse.json({message: "you are not the server owner and thus cannot create invites"}, {status: 401})
        }
        
        //get the server's invite away and push your new invite to it.
        // Might make a fancy function for it. idk
        server?.invites.push(genInvite(8))

        // update server with new invites
        await db.server.update({
            where: {
                id: serverId
            },
            data: {
                invites: server?.invites
            }
        })

        // return a 200 yippe
        return NextResponse.json({message: 'invite created'}, {status: 200})

    } catch (e) {

        // TODO: More error handling 
        if(e instanceof Error) {
            console.log(e.stack)
        }
        return NextResponse.json( {
            message: "Something went wrong, please try again"
        }, {status: 500})
    }
}