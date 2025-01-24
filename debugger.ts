import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

console.log(await db.user.findMany());

db.$disconnect();