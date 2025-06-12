import { z } from 'zod';
import { CategoryUpdateWithoutChannelsInputObjectSchema } from './CategoryUpdateWithoutChannelsInput.schema';
import { CategoryUncheckedUpdateWithoutChannelsInputObjectSchema } from './CategoryUncheckedUpdateWithoutChannelsInput.schema';
import { CategoryCreateWithoutChannelsInputObjectSchema } from './CategoryCreateWithoutChannelsInput.schema';
import { CategoryUncheckedCreateWithoutChannelsInputObjectSchema } from './CategoryUncheckedCreateWithoutChannelsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpsertWithoutChannelsInput> = z
  .object({
    update: z.union([
      z.lazy(() => CategoryUpdateWithoutChannelsInputObjectSchema),
      z.lazy(() => CategoryUncheckedUpdateWithoutChannelsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutChannelsInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutChannelsInputObjectSchema),
    ]),
  })
  .strict();

export const CategoryUpsertWithoutChannelsInputObjectSchema = Schema;
