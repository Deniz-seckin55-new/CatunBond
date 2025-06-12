import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumChannelTypeWithAggregatesFilterObjectSchema } from './EnumChannelTypeWithAggregatesFilter.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelInfoScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => ChannelInfoScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelInfoScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelInfoScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => ChannelInfoScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    type: z
      .union([
        z.lazy(() => EnumChannelTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    description: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    slowMode: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    readOnly: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    nsfw: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    pinnedMessages: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
  })
  .strict();

export const ChannelInfoScalarWhereWithAggregatesInputObjectSchema = Schema;
