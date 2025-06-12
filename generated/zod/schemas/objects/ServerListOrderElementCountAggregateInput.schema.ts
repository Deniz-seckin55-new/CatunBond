import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCountAggregateInputType> =
  z
    .object({
      id: z.literal(true).optional(),
      index: z.literal(true).optional(),
      userInfoUserId: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();

export const ServerListOrderElementCountAggregateInputObjectSchema = Schema;
