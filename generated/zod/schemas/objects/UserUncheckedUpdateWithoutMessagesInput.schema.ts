import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdateblockedInputObjectSchema } from './UserUpdateblockedInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { AuthUncheckedUpdateOneWithoutIdNestedInputObjectSchema } from './AuthUncheckedUpdateOneWithoutIdNestedInput.schema';
import { FriendRequestUncheckedUpdateManyWithoutReceiverNestedInputObjectSchema } from './FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput.schema';
import { FriendRequestUncheckedUpdateManyWithoutSenderNestedInputObjectSchema } from './FriendRequestUncheckedUpdateManyWithoutSenderNestedInput.schema';
import { ChannelUncheckedUpdateManyWithoutDirectMsgForNestedInputObjectSchema } from './ChannelUncheckedUpdateManyWithoutDirectMsgForNestedInput.schema';
import { UserUncheckedUpdateManyWithoutFriendOfNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutFriendOfNestedInput.schema';
import { UserUncheckedUpdateManyWithoutFriendsNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutFriendsNestedInput.schema';
import { ServerUncheckedUpdateManyWithoutMembersNestedInputObjectSchema } from './ServerUncheckedUpdateManyWithoutMembersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    username: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    avatarUrl: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    blocked: z
      .union([
        z.lazy(() => UserUpdateblockedInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    voiceChatChannelId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    variables: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    auth: z
      .lazy(() => AuthUncheckedUpdateOneWithoutIdNestedInputObjectSchema)
      .optional(),
    receivedRequests: z
      .lazy(
        () =>
          FriendRequestUncheckedUpdateManyWithoutReceiverNestedInputObjectSchema,
      )
      .optional(),
    sentRequests: z
      .lazy(
        () =>
          FriendRequestUncheckedUpdateManyWithoutSenderNestedInputObjectSchema,
      )
      .optional(),
    directMsgs: z
      .lazy(
        () =>
          ChannelUncheckedUpdateManyWithoutDirectMsgForNestedInputObjectSchema,
      )
      .optional(),
    friends: z
      .lazy(() => UserUncheckedUpdateManyWithoutFriendOfNestedInputObjectSchema)
      .optional(),
    friendOf: z
      .lazy(() => UserUncheckedUpdateManyWithoutFriendsNestedInputObjectSchema)
      .optional(),
    servers: z
      .lazy(
        () => ServerUncheckedUpdateManyWithoutMembersNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutMessagesInputObjectSchema = Schema;
