import { z } from 'zod';
import { MuteTypeSchema } from '../enums/MuteType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMuteTypeFilterObjectSchema } from './NestedEnumMuteTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumMuteTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => MuteTypeSchema).optional(),
    in: z
      .union([
        z.lazy(() => MuteTypeSchema).array(),
        z.lazy(() => MuteTypeSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => MuteTypeSchema).array(),
        z.lazy(() => MuteTypeSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => MuteTypeSchema),
        z.lazy(() => NestedEnumMuteTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumMuteTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumMuteTypeFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumMuteTypeWithAggregatesFilterObjectSchema = Schema;
