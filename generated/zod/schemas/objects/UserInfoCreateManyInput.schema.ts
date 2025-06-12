import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoCreateManyInput> = z
  .object({
    userId: z.string(),
    biography: z.string(),
    usernameColor: z.string().optional(),
    mainLink: z.string(),
    shortDescription: z.string(),
  })
  .strict();

export const UserInfoCreateManyInputObjectSchema = Schema;
