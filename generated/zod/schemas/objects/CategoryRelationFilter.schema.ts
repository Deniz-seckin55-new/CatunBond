import { z } from 'zod';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryRelationFilter> = z
  .object({
    is: z
      .lazy(() => CategoryWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CategoryWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const CategoryRelationFilterObjectSchema = Schema;
