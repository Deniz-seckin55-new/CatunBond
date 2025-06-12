import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { NestedEnumFriendRequestStatusFilterObjectSchema } from './NestedEnumFriendRequestStatusFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumFriendRequestStatusFilter> = z
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
        z.lazy(() => NestedEnumFriendRequestStatusFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumFriendRequestStatusFilterObjectSchema = Schema;
