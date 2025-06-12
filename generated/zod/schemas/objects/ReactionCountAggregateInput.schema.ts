import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    emojiName: z.literal(true).optional(),
    messageId: z.literal(true).optional(),
    channelId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ReactionCountAggregateInputObjectSchema = Schema;
