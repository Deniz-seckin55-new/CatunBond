import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatCreateWithoutMembersInput> = z
  .object({
    channelId: z.string(),
    serverId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const VoiceChatCreateWithoutMembersInputObjectSchema = Schema;
