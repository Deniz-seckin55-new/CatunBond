import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumChannelTypeWithAggregatesFilterObjectSchema } from './EnumChannelTypeWithAggregatesFilter.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ChannelScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => ChannelScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    channelType: z
      .union([
        z.lazy(() => EnumChannelTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    categoryId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    index: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const ChannelScalarWhereWithAggregatesInputObjectSchema = Schema;
