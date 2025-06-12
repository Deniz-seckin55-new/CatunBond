import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementAvgAggregateInputType> = z
  .object({
    index: z.literal(true).optional(),
  })
  .strict();

export const ServerListOrderElementAvgAggregateInputObjectSchema = Schema;
