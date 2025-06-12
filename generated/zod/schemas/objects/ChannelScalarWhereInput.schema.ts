import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumChannelTypeFilterObjectSchema } from './EnumChannelTypeFilter.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelScalarWhereInputObjectSchema),
        z.lazy(() => ChannelScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelScalarWhereInputObjectSchema),
        z.lazy(() => ChannelScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    channelType: z
      .union([
        z.lazy(() => EnumChannelTypeFilterObjectSchema),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    categoryId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    index: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const ChannelScalarWhereInputObjectSchema = Schema;
