import { db } from "@/lib/prisma";

console.log(await db.user.findMany());

db.$disconnect();