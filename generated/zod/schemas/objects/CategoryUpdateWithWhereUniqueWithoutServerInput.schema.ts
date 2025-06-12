import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutServerInputObjectSchema } from './CategoryUpdateWithoutServerInput.schema';
import { CategoryUncheckedUpdateWithoutServerInputObjectSchema } from './CategoryUncheckedUpdateWithoutServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutServerInput> =
  z
    .object({
      where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CategoryUpdateWithoutServerInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutServerInputObjectSchema),
      ]),
    })
    .strict();

export const CategoryUpdateWithWhereUniqueWithoutServerInputObjectSchema =
  Schema;
