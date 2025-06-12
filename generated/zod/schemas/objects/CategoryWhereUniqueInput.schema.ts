import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
  })
  .strict();

export const CategoryWhereUniqueInputObjectSchema = Schema;
