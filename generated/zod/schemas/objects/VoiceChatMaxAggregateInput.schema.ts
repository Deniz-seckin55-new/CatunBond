import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatMaxAggregateInputType> = z
  .object({
    channelId: z.literal(true).optional(),
    serverId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const VoiceChatMaxAggregateInputObjectSchema = Schema;
