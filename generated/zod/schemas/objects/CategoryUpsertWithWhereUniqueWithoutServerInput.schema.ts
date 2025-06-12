import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutServerInputObjectSchema } from './CategoryUpdateWithoutServerInput.schema';
import { CategoryUncheckedUpdateWithoutServerInputObjectSchema } from './CategoryUncheckedUpdateWithoutServerInput.schema';
import { CategoryCreateWithoutServerInputObjectSchema } from './CategoryCreateWithoutServerInput.schema';
import { CategoryUncheckedCreateWithoutServerInputObjectSchema } from './CategoryUncheckedCreateWithoutServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutServerInput> =
  z
    .object({
      where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CategoryUpdateWithoutServerInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutServerInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CategoryCreateWithoutServerInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutServerInputObjectSchema),
      ]),
    })
    .strict();

export const CategoryUpsertWithWhereUniqueWithoutServerInputObjectSchema =
  Schema;
