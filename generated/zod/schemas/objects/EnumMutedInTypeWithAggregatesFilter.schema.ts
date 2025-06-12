import { z } from 'zod';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { NestedEnumMutedInTypeWithAggregatesFilterObjectSchema } from './NestedEnumMutedInTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMutedInTypeFilterObjectSchema } from './NestedEnumMutedInTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMutedInTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => MutedInTypeSchema).optional(),
    in: z
      .union([
        z.lazy(() => MutedInTypeSchema).array(),
        z.lazy(() => MutedInTypeSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => MutedInTypeSchema).array(),
        z.lazy(() => MutedInTypeSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => MutedInTypeSchema),
        z.lazy(() => NestedEnumMutedInTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumMutedInTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumMutedInTypeFilterObjectSchema).optional(),
  })
  .strict();

export const EnumMutedInTypeWithAggregatesFilterObjectSchema = Schema;
