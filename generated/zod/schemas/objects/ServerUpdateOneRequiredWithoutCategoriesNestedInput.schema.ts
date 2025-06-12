import { z } from 'zod';
import { ServerCreateWithoutCategoriesInputObjectSchema } from './ServerCreateWithoutCategoriesInput.schema';
import { ServerUncheckedCreateWithoutCategoriesInputObjectSchema } from './ServerUncheckedCreateWithoutCategoriesInput.schema';
import { ServerCreateOrConnectWithoutCategoriesInputObjectSchema } from './ServerCreateOrConnectWithoutCategoriesInput.schema';
import { ServerUpsertWithoutCategoriesInputObjectSchema } from './ServerUpsertWithoutCategoriesInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';
import { ServerUpdateWithoutCategoriesInputObjectSchema } from './ServerUpdateWithoutCategoriesInput.schema';
import { ServerUncheckedUpdateWithoutCategoriesInputObjectSchema } from './ServerUncheckedUpdateWithoutCategoriesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpdateOneRequiredWithoutCategoriesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ServerCreateWithoutCategoriesInputObjectSchema),
          z.lazy(() => ServerUncheckedCreateWithoutCategoriesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ServerCreateOrConnectWithoutCategoriesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => ServerUpsertWithoutCategoriesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ServerWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ServerUpdateWithoutCategoriesInputObjectSchema),
          z.lazy(() => ServerUncheckedUpdateWithoutCategoriesInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const ServerUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema =
  Schema;
