import { z } from 'zod';
import { CategoryCreateWithoutChannelsInputObjectSchema } from './CategoryCreateWithoutChannelsInput.schema';
import { CategoryUncheckedCreateWithoutChannelsInputObjectSchema } from './CategoryUncheckedCreateWithoutChannelsInput.schema';
import { CategoryCreateOrConnectWithoutChannelsInputObjectSchema } from './CategoryCreateOrConnectWithoutChannelsInput.schema';
import { CategoryUpsertWithoutChannelsInputObjectSchema } from './CategoryUpsertWithoutChannelsInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutChannelsInputObjectSchema } from './CategoryUpdateWithoutChannelsInput.schema';
import { CategoryUncheckedUpdateWithoutChannelsInputObjectSchema } from './CategoryUncheckedUpdateWithoutChannelsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpdateOneWithoutChannelsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutChannelsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutChannelsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CategoryCreateOrConnectWithoutChannelsInputObjectSchema)
      .optional(),
    upsert: z
      .lazy(() => CategoryUpsertWithoutChannelsInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => CategoryUpdateWithoutChannelsInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutChannelsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const CategoryUpdateOneWithoutChannelsNestedInputObjectSchema = Schema;
