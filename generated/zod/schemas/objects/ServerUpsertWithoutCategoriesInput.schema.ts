import { z } from 'zod';
import { ServerUpdateWithoutCategoriesInputObjectSchema } from './ServerUpdateWithoutCategoriesInput.schema';
import { ServerUncheckedUpdateWithoutCategoriesInputObjectSchema } from './ServerUncheckedUpdateWithoutCategoriesInput.schema';
import { ServerCreateWithoutCategoriesInputObjectSchema } from './ServerCreateWithoutCategoriesInput.schema';
import { ServerUncheckedCreateWithoutCategoriesInputObjectSchema } from './ServerUncheckedCreateWithoutCategoriesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpsertWithoutCategoriesInput> = z
  .object({
    update: z.union([
      z.lazy(() => ServerUpdateWithoutCategoriesInputObjectSchema),
      z.lazy(() => ServerUncheckedUpdateWithoutCategoriesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ServerCreateWithoutCategoriesInputObjectSchema),
      z.lazy(() => ServerUncheckedCreateWithoutCategoriesInputObjectSchema),
    ]),
  })
  .strict();

export const ServerUpsertWithoutCategoriesInputObjectSchema = Schema;
