import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthWhereUniqueInput> = z
  .object({
    userId: z.string().optional(),
  })
  .strict();

export const AuthWhereUniqueInputObjectSchema = Schema;
