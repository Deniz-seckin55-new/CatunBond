import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    iconUrl: z.literal(true).optional(),
    name: z.literal(true).optional(),
    ownerId: z.literal(true).optional(),
    invites: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ServerCountAggregateInputObjectSchema = Schema;
