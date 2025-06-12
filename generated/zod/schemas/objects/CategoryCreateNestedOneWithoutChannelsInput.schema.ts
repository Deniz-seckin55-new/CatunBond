import { z } from 'zod';
import { CategoryCreateWithoutChannelsInputObjectSchema } from './CategoryCreateWithoutChannelsInput.schema';
import { CategoryUncheckedCreateWithoutChannelsInputObjectSchema } from './CategoryUncheckedCreateWithoutChannelsInput.schema';
import { CategoryCreateOrConnectWithoutChannelsInputObjectSchema } from './CategoryCreateOrConnectWithoutChannelsInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutChannelsInput> = z
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
    connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const CategoryCreateNestedOneWithoutChannelsInputObjectSchema = Schema;
