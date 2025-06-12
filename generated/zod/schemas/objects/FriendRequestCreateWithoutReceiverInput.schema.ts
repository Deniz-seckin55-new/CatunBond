import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { UserCreateNestedOneWithoutSentRequestsInputObjectSchema } from './UserCreateNestedOneWithoutSentRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateWithoutReceiverInput> = z
  .object({
    id: z.string().optional(),
    status: z.lazy(() => FriendRequestStatusSchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sender: z.lazy(
      () => UserCreateNestedOneWithoutSentRequestsInputObjectSchema,
    ),
  })
  .strict();

export const FriendRequestCreateWithoutReceiverInputObjectSchema = Schema;
