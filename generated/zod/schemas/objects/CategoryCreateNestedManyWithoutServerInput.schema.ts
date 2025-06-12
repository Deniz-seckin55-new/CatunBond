import { z } from 'zod';
import { CategoryCreateWithoutServerInputObjectSchema } from './CategoryCreateWithoutServerInput.schema';
import { CategoryUncheckedCreateWithoutServerInputObjectSchema } from './CategoryUncheckedCreateWithoutServerInput.schema';
import { CategoryCreateOrConnectWithoutServerInputObjectSchema } from './CategoryCreateOrConnectWithoutServerInput.schema';
import { CategoryCreateManyServerInputEnvelopeObjectSchema } from './CategoryCreateManyServerInputEnvelope.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutServerInput> = z
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
    createMany: z
      .lazy(() => CategoryCreateManyServerInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CategoryCreateNestedManyWithoutServerInputObjectSchema = Schema;
