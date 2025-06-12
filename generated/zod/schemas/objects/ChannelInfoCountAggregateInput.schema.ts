import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoCountAggregateInputType> = z
  .object({
    channelId: z.literal(true).optional(),
    name: z.literal(true).optional(),
    type: z.literal(true).optional(),
    description: z.literal(true).optional(),
    slowMode: z.literal(true).optional(),
    readOnly: z.literal(true).optional(),
    nsfw: z.literal(true).optional(),
    pinnedMessages: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ChannelInfoCountAggregateInputObjectSchema = Schema;
