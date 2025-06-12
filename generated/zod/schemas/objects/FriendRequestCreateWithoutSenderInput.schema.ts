import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { UserCreateNestedOneWithoutReceivedRequestsInputObjectSchema } from './UserCreateNestedOneWithoutReceivedRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateWithoutSenderInput> = z
  .object({
    id: z.string().optional(),
    status: z.lazy(() => FriendRequestStatusSchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    receiver: z.lazy(
      () => UserCreateNestedOneWithoutReceivedRequestsInputObjectSchema,
    ),
  })
  .strict();

export const FriendRequestCreateWithoutSenderInputObjectSchema = Schema;
