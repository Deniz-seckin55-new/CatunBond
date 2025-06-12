import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoAvgAggregateInputType> = z
  .object({
    slowMode: z.literal(true).optional(),
  })
  .strict();

export const ChannelInfoAvgAggregateInputObjectSchema = Schema;
