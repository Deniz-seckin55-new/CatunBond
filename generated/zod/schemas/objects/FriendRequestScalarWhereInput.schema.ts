import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumFriendRequestStatusFilterObjectSchema } from './EnumFriendRequestStatusFilter.schema';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FriendRequestScalarWhereInputObjectSchema),
        z.lazy(() => FriendRequestScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FriendRequestScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FriendRequestScalarWhereInputObjectSchema),
        z.lazy(() => FriendRequestScalarWhereInputObjectSchema).array(),
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
  })
  .strict();

export const FriendRequestScalarWhereInputObjectSchema = Schema;
