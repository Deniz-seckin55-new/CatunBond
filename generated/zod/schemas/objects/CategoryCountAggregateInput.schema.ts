import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    serverId: z.literal(true).optional(),
    index: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const CategoryCountAggregateInputObjectSchema = Schema;
