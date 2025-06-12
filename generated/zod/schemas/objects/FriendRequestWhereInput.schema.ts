import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumFriendRequestStatusFilterObjectSchema } from './EnumFriendRequestStatusFilter.schema';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FriendRequestWhereInputObjectSchema),
        z.lazy(() => FriendRequestWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FriendRequestWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FriendRequestWhereInputObjectSchema),
        z.lazy(() => FriendRequestWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    senderId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    receiverId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumFriendRequestStatusFilterObjectSchema),
        z.lazy(() => FriendRequestStatusSchema),
      ])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    receiver: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    sender: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const FriendRequestWhereInputObjectSchema = Schema;
