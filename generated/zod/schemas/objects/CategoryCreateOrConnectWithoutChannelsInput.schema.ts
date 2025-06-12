import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutChannelsInputObjectSchema } from './CategoryCreateWithoutChannelsInput.schema';
import { CategoryUncheckedCreateWithoutChannelsInputObjectSchema } from './CategoryUncheckedCreateWithoutChannelsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutChannelsInput> = z
  .object({
    where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutChannelsInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutChannelsInputObjectSchema),
    ]),
  })
  .strict();

export const CategoryCreateOrConnectWithoutChannelsInputObjectSchema = Schema;
