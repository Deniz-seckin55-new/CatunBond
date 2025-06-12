import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FriendRequestStatusSchema } from '../enums/FriendRequestStatus.schema';
import { EnumFriendRequestStatusFieldUpdateOperationsInputObjectSchema } from './EnumFriendRequestStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutSentRequestsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutSentRequestsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateWithoutReceiverInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    status: z
      .union([
        z.lazy(() => FriendRequestStatusSchema),
        z.lazy(
          () => EnumFriendRequestStatusFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    sender: z
      .lazy(
        () => UserUpdateOneRequiredWithoutSentRequestsNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const FriendRequestUpdateWithoutReceiverInputObjectSchema = Schema;
