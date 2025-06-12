import { z } from 'zod';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumFriendRequestStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => FriendRequestStatusSchema).optional(),
    })
    .strict();

export const EnumFriendRequestStatusFieldUpdateOperationsInputObjectSchema =
  Schema;
