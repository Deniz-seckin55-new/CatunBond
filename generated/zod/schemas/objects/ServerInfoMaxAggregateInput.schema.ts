import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoMaxAggregateInputType> = z
  .object({
    serverId: z.literal(true).optional(),
    name: z.literal(true).optional(),
    iconUrl: z.literal(true).optional(),
    maxUsers: z.literal(true).optional(),
    color: z.literal(true).optional(),
    description: z.literal(true).optional(),
    slogan: z.literal(true).optional(),
  })
  .strict();

export const ServerInfoMaxAggregateInputObjectSchema = Schema;
