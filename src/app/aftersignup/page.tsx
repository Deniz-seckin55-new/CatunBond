import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";

export default async function Page() {
    try {
        currentUser().then(user => {

            if (!user) {
                console.error("No user found.");
                return;
            }

            const db = new PrismaClient();

            // Check if the user exists in the database
            db.user.findUnique({
                where: { id: user.id },
            }).then(userExists => {

                if (!userExists) {
                    let avatarUrl: string;
                    if (user.hasImage)
                        avatarUrl = user.imageUrl;
                    else {
                        avatarUrl = "https://cat-storage-server.web.app/data/cat1.jpeg";
                    }

                    db.user.create({
                        data: {
                            id: user.id,
                            username: user.username || "Default_User",
                            avatarUrl: avatarUrl,
                        },
                    }).then(response => {
                        console.log("Done!",response);
                    });
                } else {
                    console.log("User already exists.");
                }

                db.$disconnect();
            });
        });
    } catch (err) { console.error("Server error ", err) } finally {
        permanentRedirect('/app');
    }

    return (<></>);
}
