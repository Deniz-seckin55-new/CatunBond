import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoAvgAggregateInputType> = z
  .object({
    maxUsers: z.literal(true).optional(),
  })
  .strict();

export const ServerInfoAvgAggregateInputObjectSchema = Schema;
