import { z } from 'zod';
import { MuteTypeSchema } from '../enums/MuteType.schema';
import { NestedEnumMuteTypeFilterObjectSchema } from './NestedEnumMuteTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMuteTypeFilter> = z
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
        z.lazy(() => NestedEnumMuteTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumMuteTypeFilterObjectSchema = Schema;
