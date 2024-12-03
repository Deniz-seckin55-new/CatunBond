import { PrismaClient } from "@prisma/client";
import uuid4 from "uuid4";
const bcrypt = require("bcrypt");
const uuid = require("uuid4");
const saltRounds = 14;

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    const { password, username } = data;
    console.log(password, username);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    await prisma.user.create({
      data: {
        auth: {
          create: {
            password_hash: hash,
            salt: salt,
          },
        },
        id: uuid4(),
        username: username,
        servers: [],
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return Response.json(
      {
        success: true,
        message: "User has been successfully created",
        info: user,
      },
      { status: 200 }
    );

    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    if (error.code === "P2002" && error.meta.target.includes("username")) {
      return new Response(
        "The username provided is already in use. Please use a different username.",
        { status: 400 }
      );
    } else {
      console.log(error);
      return new Response(
        "An error occurred while creating the user. Please try again later, or contact the site owner if the issue persists. ",
        { status: 500 }
      );
    }
  }
}
