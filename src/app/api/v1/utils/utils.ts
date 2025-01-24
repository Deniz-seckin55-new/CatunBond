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