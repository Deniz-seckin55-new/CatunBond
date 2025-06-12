import { z } from 'zod';
import { ServerCreateWithoutCategoriesInputObjectSchema } from './ServerCreateWithoutCategoriesInput.schema';
import { ServerUncheckedCreateWithoutCategoriesInputObjectSchema } from './ServerUncheckedCreateWithoutCategoriesInput.schema';
import { ServerCreateOrConnectWithoutCategoriesInputObjectSchema } from './ServerCreateOrConnectWithoutCategoriesInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCreateNestedOneWithoutCategoriesInput> = z
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
    connect: z.lazy(() => ServerWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ServerCreateNestedOneWithoutCategoriesInputObjectSchema = Schema;
