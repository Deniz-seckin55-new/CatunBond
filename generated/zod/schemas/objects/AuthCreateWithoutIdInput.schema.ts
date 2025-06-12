import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthCreateWithoutIdInput> = z
  .object({
    password_hash: z.string(),
    salt: z.string(),
  })
  .strict();

export const AuthCreateWithoutIdInputObjectSchema = Schema;
