import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumMutedInTypeWithAggregatesFilterObjectSchema } from './EnumMutedInTypeWithAggregatesFilter.schema';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { EnumMuteTypeWithAggregatesFilterObjectSchema } from './EnumMuteTypeWithAggregatesFilter.schema';
import { MuteTypeSchema } from '../enums/MuteType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserMuteScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => UserMuteScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserMuteScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserMuteScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => UserMuteScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    startedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    endsAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    mutedIn: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    mutedInType: z
      .union([
        z.lazy(() => EnumMutedInTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => MutedInTypeSchema),
      ])
      .optional(),
    muteType: z
      .union([
        z.lazy(() => EnumMuteTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => MuteTypeSchema),
      ])
      .optional(),
  })
  .strict();

export const UserMuteScalarWhereWithAggregatesInputObjectSchema = Schema;
