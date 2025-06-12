import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoMaxAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
    biography: z.literal(true).optional(),
    usernameColor: z.literal(true).optional(),
    mainLink: z.literal(true).optional(),
    shortDescription: z.literal(true).optional(),
  })
  .strict();

export const UserInfoMaxAggregateInputObjectSchema = Schema;
