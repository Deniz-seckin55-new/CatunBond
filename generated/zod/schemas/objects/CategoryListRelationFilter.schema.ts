import { z } from 'zod';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryListRelationFilter> = z
  .object({
    every: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
    some: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
    none: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  })
  .strict();

export const CategoryListRelationFilterObjectSchema = Schema;
