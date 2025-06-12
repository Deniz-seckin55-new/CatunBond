import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumChannelTypeFilter> = z
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
        z.lazy(() => NestedEnumChannelTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumChannelTypeFilterObjectSchema = Schema;
