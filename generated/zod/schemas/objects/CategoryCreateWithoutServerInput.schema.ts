import { z } from 'zod';
import { ChannelCreateNestedManyWithoutCategoryInputObjectSchema } from './ChannelCreateNestedManyWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateWithoutServerInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    index: z.number().optional(),
    channels: z
      .lazy(() => ChannelCreateNestedManyWithoutCategoryInputObjectSchema)
      .optional(),
  })
  .strict();

export const CategoryCreateWithoutServerInputObjectSchema = Schema;
