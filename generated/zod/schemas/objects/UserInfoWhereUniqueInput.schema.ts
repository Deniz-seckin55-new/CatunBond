import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoWhereUniqueInput> = z
  .object({
    userId: z.string().optional(),
  })
  .strict();

export const UserInfoWhereUniqueInputObjectSchema = Schema;
