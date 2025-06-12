import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    channelType: z.literal(true).optional(),
    categoryId: z.literal(true).optional(),
    index: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ChannelCountAggregateInputObjectSchema = Schema;
