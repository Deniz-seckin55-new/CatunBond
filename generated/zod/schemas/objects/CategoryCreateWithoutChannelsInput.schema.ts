import { z } from 'zod';
import { ServerCreateNestedOneWithoutCategoriesInputObjectSchema } from './ServerCreateNestedOneWithoutCategoriesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateWithoutChannelsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    index: z.number().optional(),
    server: z.lazy(
      () => ServerCreateNestedOneWithoutCategoriesInputObjectSchema,
    ),
  })
  .strict();

export const CategoryCreateWithoutChannelsInputObjectSchema = Schema;
