import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    index: z.literal(true).optional(),
    userInfoUserId: z.literal(true).optional(),
  })
  .strict();

export const ServerListOrderElementMinAggregateInputObjectSchema = Schema;
