import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoCountAggregateInputType> = z
  .object({
    serverId: z.literal(true).optional(),
    name: z.literal(true).optional(),
    iconUrl: z.literal(true).optional(),
    maxUsers: z.literal(true).optional(),
    color: z.literal(true).optional(),
    description: z.literal(true).optional(),
    slogan: z.literal(true).optional(),
    rules: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ServerInfoCountAggregateInputObjectSchema = Schema;
