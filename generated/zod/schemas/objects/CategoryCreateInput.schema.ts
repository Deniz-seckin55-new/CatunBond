import { z } from 'zod';
import { ServerCreateNestedOneWithoutCategoriesInputObjectSchema } from './ServerCreateNestedOneWithoutCategoriesInput.schema';
import { ChannelCreateNestedManyWithoutCategoryInputObjectSchema } from './ChannelCreateNestedManyWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    index: z.number().optional(),
    server: z.lazy(
      () => ServerCreateNestedOneWithoutCategoriesInputObjectSchema,
    ),
    channels: z
      .lazy(() => ChannelCreateNestedManyWithoutCategoryInputObjectSchema)
      .optional(),
  })
  .strict();

export const CategoryCreateInputObjectSchema = Schema;
