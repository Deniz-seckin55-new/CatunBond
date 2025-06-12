import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdatementionsInput> = z
  .object({
    set: z.string().array().optional(),
  })
  .strict();

export const MessagesUpdatementionsInputObjectSchema = Schema;
