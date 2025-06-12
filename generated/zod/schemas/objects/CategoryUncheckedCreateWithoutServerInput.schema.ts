import { z } from 'zod';
import { ChannelUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './ChannelUncheckedCreateNestedManyWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutServerInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    index: z.number().optional(),
    channels: z
      .lazy(
        () => ChannelUncheckedCreateNestedManyWithoutCategoryInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const CategoryUncheckedCreateWithoutServerInputObjectSchema = Schema;
