import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page() {
    async function create() {
        'use server';

        const user = await currentUser();
        if (!user) {
            console.error("No user found.");
            return;
        }

        const db = new PrismaClient();

        // Check if the user exists in the database
        const userExists = await db.user.findUnique({
            where: { id: user.id },
        });

        if (!userExists) {
            let avatarUrl: string;
            if(user.hasImage)
                avatarUrl = user.imageUrl;
            else {
                avatarUrl = "https://cat-storage-server.web.app/data/cat1.jpeg";
                await fetch("/api/v1/user/", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ imageUrl: avatarUrl }),
                });
            }

            await db.user.create({
                data: {
                    id: user.id,
                    username: user.username || "Default_User",
                    avatarUrl: avatarUrl,
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
