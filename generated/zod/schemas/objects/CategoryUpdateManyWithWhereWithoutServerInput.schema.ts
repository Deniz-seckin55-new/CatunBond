import { z } from 'zod';
import { CategoryScalarWhereInputObjectSchema } from './CategoryScalarWhereInput.schema';
import { CategoryUpdateManyMutationInputObjectSchema } from './CategoryUpdateManyMutationInput.schema';
import { CategoryUncheckedUpdateManyWithoutCategoriesInputObjectSchema } from './CategoryUncheckedUpdateManyWithoutCategoriesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutServerInput> =
  z
    .object({
      where: z.lazy(() => CategoryScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CategoryUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CategoryUncheckedUpdateManyWithoutCategoriesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CategoryUpdateManyWithWhereWithoutServerInputObjectSchema = Schema;
