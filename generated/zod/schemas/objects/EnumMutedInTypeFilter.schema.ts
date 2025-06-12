import { z } from 'zod';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { NestedEnumMutedInTypeFilterObjectSchema } from './NestedEnumMutedInTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMutedInTypeFilter> = z
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
        z.lazy(() => NestedEnumMutedInTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumMutedInTypeFilterObjectSchema = Schema;
