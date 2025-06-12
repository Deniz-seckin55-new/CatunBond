import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteWhereUniqueInput> = z
  .object({
    userId: z.string().optional(),
  })
  .strict();

export const UserMuteWhereUniqueInputObjectSchema = Schema;
