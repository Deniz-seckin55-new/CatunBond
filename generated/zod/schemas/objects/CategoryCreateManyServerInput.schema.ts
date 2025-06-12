import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateManyServerInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    index: z.number().optional(),
  })
  .strict();

export const CategoryCreateManyServerInputObjectSchema = Schema;
