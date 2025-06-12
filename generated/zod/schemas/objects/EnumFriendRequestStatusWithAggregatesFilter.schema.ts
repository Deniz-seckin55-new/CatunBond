import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { NestedEnumFriendRequestStatusWithAggregatesFilterObjectSchema } from './NestedEnumFriendRequestStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumFriendRequestStatusFilterObjectSchema } from './NestedEnumFriendRequestStatusFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumFriendRequestStatusWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => FriendRequestStatusSchema).optional(),
    in: z
      .union([
        z.lazy(() => FriendRequestStatusSchema).array(),
        z.lazy(() => FriendRequestStatusSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => FriendRequestStatusSchema).array(),
        z.lazy(() => FriendRequestStatusSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => FriendRequestStatusSchema),
        z.lazy(
          () => NestedEnumFriendRequestStatusWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z
      .lazy(() => NestedEnumFriendRequestStatusFilterObjectSchema)
      .optional(),
    _max: z
      .lazy(() => NestedEnumFriendRequestStatusFilterObjectSchema)
      .optional(),
  })
  .strict();

export const EnumFriendRequestStatusWithAggregatesFilterObjectSchema = Schema;
