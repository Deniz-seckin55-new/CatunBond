import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { NestedEnumChannelTypeWithAggregatesFilterObjectSchema } from './NestedEnumChannelTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumChannelTypeFilterObjectSchema } from './NestedEnumChannelTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumChannelTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => ChannelTypeSchema).optional(),
    in: z
      .union([
        z.lazy(() => ChannelTypeSchema).array(),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => ChannelTypeSchema).array(),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => ChannelTypeSchema),
        z.lazy(() => NestedEnumChannelTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumChannelTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumChannelTypeFilterObjectSchema).optional(),
  })
  .strict();

export const EnumChannelTypeWithAggregatesFilterObjectSchema = Schema;
