import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthMaxAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
    password_hash: z.literal(true).optional(),
    salt: z.literal(true).optional(),
  })
  .strict();

export const AuthMaxAggregateInputObjectSchema = Schema;
