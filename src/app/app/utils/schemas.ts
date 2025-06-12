import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const ChannelTypeSchema  = z.enum([ChannelType.TEXT, ChannelType.DIRECTMESSAGE]);

export const ChannelSchema = z.object({
    id: z.string(),
    name: z.string(),
    channelType: ChannelTypeSchema,
    categoryId: z.string().nullable(),
});

export const SendMessageISchema = z.object({
    tempID: z.string(),
    content: z.string(),
    channelId: z.string(),
    author: z.object({
        id: z.string(),
        username: z.string(),
        avatarUrl: z.string().nullable(),
    }),
    repliedToId: z.string().optional(),
    repliedToAuthor: z.object({
        id: z.string(),
        username: z.string(),
        avatarUrl: z.string().nullable()
    }).optional(),
    repliedToContent: z.string().optional(),
    timestamp: z.string().transform((str) => new Date(str)),
    attachments: z.array(z.string()).max(10).optional()
});

export const channelParse = ChannelSchema.safeParse;
export const messageIParse = SendMessageISchema.safeParse;