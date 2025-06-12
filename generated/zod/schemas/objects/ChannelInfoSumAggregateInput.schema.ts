import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoSumAggregateInputType> = z
  .object({
    slowMode: z.literal(true).optional(),
  })
  .strict();

export const ChannelInfoSumAggregateInputObjectSchema = Schema;
