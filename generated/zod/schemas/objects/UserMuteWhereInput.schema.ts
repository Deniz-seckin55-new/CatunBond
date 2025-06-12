import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumMutedInTypeFilterObjectSchema } from './EnumMutedInTypeFilter.schema';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { EnumMuteTypeFilterObjectSchema } from './EnumMuteTypeFilter.schema';
import { MuteTypeSchema } from '../enums/MuteType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserMuteWhereInputObjectSchema),
        z.lazy(() => UserMuteWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserMuteWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserMuteWhereInputObjectSchema),
        z.lazy(() => UserMuteWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    startedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    endsAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    mutedIn: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    mutedInType: z
      .union([
        z.lazy(() => EnumMutedInTypeFilterObjectSchema),
        z.lazy(() => MutedInTypeSchema),
      ])
      .optional(),
    muteType: z
      .union([
        z.lazy(() => EnumMuteTypeFilterObjectSchema),
        z.lazy(() => MuteTypeSchema),
      ])
      .optional(),
  })
  .strict();

export const UserMuteWhereInputObjectSchema = Schema;
