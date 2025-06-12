import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    iconUrl: z.literal(true).optional(),
    name: z.literal(true).optional(),
    ownerId: z.literal(true).optional(),
  })
  .strict();

export const ServerMaxAggregateInputObjectSchema = Schema;
