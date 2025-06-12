import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutServerInputObjectSchema } from './CategoryCreateWithoutServerInput.schema';
import { CategoryUncheckedCreateWithoutServerInputObjectSchema } from './CategoryUncheckedCreateWithoutServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutServerInput> = z
  .object({
    where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutServerInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutServerInputObjectSchema),
    ]),
  })
  .strict();

export const CategoryCreateOrConnectWithoutServerInputObjectSchema = Schema;
