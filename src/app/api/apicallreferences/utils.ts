import { SendMessageI } from "@/app/app/utils/socket_utils";
import { Channel, PrismaClient } from "@prisma/client";

export const CreateMessageI = async (db: PrismaClient, message: SendMessageI) => {
    return await db.messages.create({
        data: {
            content: message.content, channelId: message.channelId, authorId: message.author.id,
            repliedToId: message.repliedToId,
            attachments: message.attachments ?? [],
        }
        ,
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true
                }
            },
            channel: {
                select: {
                    id: true,
                    categoryId: true,
                    name: true
                }
            },
            repliedTo: {
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true
                        }
                    },
                    channel: {
                        select: {
                            id: true,
                            categoryId: true,
                            name: true
                        }
                    },
                    repliedTo: {
                        select: { id: true } // Depth End
                    }
                },
            }
        },
    });
}

export async function CreateChannelInfo(db: PrismaClient, channelExists: Channel) {
    return await db.channelInfo.create({
        data: {
            channelId: channelExists.id,
            description: "",
            name: channelExists.name,
            type: channelExists.channelType,
        }
    });
}