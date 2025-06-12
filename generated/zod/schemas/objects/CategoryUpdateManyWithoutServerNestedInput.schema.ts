import { z } from 'zod';
import { CategoryCreateWithoutServerInputObjectSchema } from './CategoryCreateWithoutServerInput.schema';
import { CategoryUncheckedCreateWithoutServerInputObjectSchema } from './CategoryUncheckedCreateWithoutServerInput.schema';
import { CategoryCreateOrConnectWithoutServerInputObjectSchema } from './CategoryCreateOrConnectWithoutServerInput.schema';
import { CategoryUpsertWithWhereUniqueWithoutServerInputObjectSchema } from './CategoryUpsertWithWhereUniqueWithoutServerInput.schema';
import { CategoryCreateManyServerInputEnvelopeObjectSchema } from './CategoryCreateManyServerInputEnvelope.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithWhereUniqueWithoutServerInputObjectSchema } from './CategoryUpdateWithWhereUniqueWithoutServerInput.schema';
import { CategoryUpdateManyWithWhereWithoutServerInputObjectSchema } from './CategoryUpdateManyWithWhereWithoutServerInput.schema';
import { CategoryScalarWhereInputObjectSchema } from './CategoryScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpdateManyWithoutServerNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutServerInputObjectSchema),
        z.lazy(() => CategoryCreateWithoutServerInputObjectSchema).array(),
        z.lazy(() => CategoryUncheckedCreateWithoutServerInputObjectSchema),
        z
          .lazy(() => CategoryUncheckedCreateWithoutServerInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CategoryCreateOrConnectWithoutServerInputObjectSchema),
        z
          .lazy(() => CategoryCreateOrConnectWithoutServerInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => CategoryUpsertWithWhereUniqueWithoutServerInputObjectSchema,
        ),
        z
          .lazy(
            () => CategoryUpsertWithWhereUniqueWithoutServerInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CategoryCreateManyServerInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => CategoryUpdateWithWhereUniqueWithoutServerInputObjectSchema,
        ),
        z
          .lazy(
            () => CategoryUpdateWithWhereUniqueWithoutServerInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CategoryUpdateManyWithWhereWithoutServerInputObjectSchema),
        z
          .lazy(() => CategoryUpdateManyWithWhereWithoutServerInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CategoryScalarWhereInputObjectSchema),
        z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CategoryUpdateManyWithoutServerNestedInputObjectSchema = Schema;
