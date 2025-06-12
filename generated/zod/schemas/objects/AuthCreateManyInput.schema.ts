import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthCreateManyInput> = z
  .object({
    userId: z.string(),
    password_hash: z.string(),
    salt: z.string(),
  })
  .strict();

export const AuthCreateManyInputObjectSchema = Schema;
