import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateManyInput> = z
  .object({
    id: z.string().optional(),
    senderId: z.string(),
    receiverId: z.string(),
    status: z.lazy(() => FriendRequestStatusSchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const FriendRequestCreateManyInputObjectSchema = Schema;
