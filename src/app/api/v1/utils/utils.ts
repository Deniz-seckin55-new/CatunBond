import { PrismaClient } from "@prisma/client";

export async function GenerateUserInfo(db: PrismaClient, userId: string) {
    try {
        const info = await db.userInfo.create({data: {
            userId: userId,
            biography: "",
        }});

        return info;
    } catch (err) {
        if(err instanceof Error)
            console.log(err.stack);
    }
}

// function to... generate random string of characters :yeppers:
export function genInvite(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890'
    let str: string = '';
    for (let i = 0; i < length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return str;
}