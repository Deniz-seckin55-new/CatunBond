import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const db = new PrismaClient();

export default async function Page() {
    async function create() {
        'use server';

        const user = await currentUser();
        if (!user) {
            console.error("No user found.");
            return;
        }

        // Check if the user exists in the database
        const userExists = await db.user.findUnique({
            where: { id: user.id },
        });

        if (!userExists) {
            await db.user.create({
                data: {
                    id: user.id,
                    username: user.username || "Default_User",
                    avatarUrl: "https://cat-storage-server.web.app/data/cat1.jpeg",
                },
            });
        }

        db.$disconnect();
        //redirect("/app"); Always gives error for some reason
    }

    try {
        await create();
    } catch (err) {
        if(err instanceof Error)
            console.error(err.stack);
    }

    return (<>{redirect('/app')}</>);
}
