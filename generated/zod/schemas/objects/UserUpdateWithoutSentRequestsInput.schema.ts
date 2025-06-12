import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdateblockedInputObjectSchema } from './UserUpdateblockedInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { AuthUpdateOneWithoutIdNestedInputObjectSchema } from './AuthUpdateOneWithoutIdNestedInput.schema';
import { FriendRequestUpdateManyWithoutReceiverNestedInputObjectSchema } from './FriendRequestUpdateManyWithoutReceiverNestedInput.schema';
import { MessagesUpdateManyWithoutAuthorNestedInputObjectSchema } from './MessagesUpdateManyWithoutAuthorNestedInput.schema';
import { VoiceChatUpdateOneWithoutMembersNestedInputObjectSchema } from './VoiceChatUpdateOneWithoutMembersNestedInput.schema';
import { ChannelUpdateManyWithoutDirectMsgForNestedInputObjectSchema } from './ChannelUpdateManyWithoutDirectMsgForNestedInput.schema';
import { UserUpdateManyWithoutFriendOfNestedInputObjectSchema } from './UserUpdateManyWithoutFriendOfNestedInput.schema';
import { UserUpdateManyWithoutFriendsNestedInputObjectSchema } from './UserUpdateManyWithoutFriendsNestedInput.schema';
import { ServerUpdateManyWithoutMembersNestedInputObjectSchema } from './ServerUpdateManyWithoutMembersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.UserUpdateWithoutSentRequestsInput> = z
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
    variables: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    auth: z
      .lazy(() => AuthUpdateOneWithoutIdNestedInputObjectSchema)
      .optional(),
    receivedRequests: z
      .lazy(() => FriendRequestUpdateManyWithoutReceiverNestedInputObjectSchema)
      .optional(),
    messages: z
      .lazy(() => MessagesUpdateManyWithoutAuthorNestedInputObjectSchema)
      .optional(),
    VoiceChat: z
      .lazy(() => VoiceChatUpdateOneWithoutMembersNestedInputObjectSchema)
      .optional(),
    directMsgs: z
      .lazy(() => ChannelUpdateManyWithoutDirectMsgForNestedInputObjectSchema)
      .optional(),
    friends: z
      .lazy(() => UserUpdateManyWithoutFriendOfNestedInputObjectSchema)
      .optional(),
    friendOf: z
      .lazy(() => UserUpdateManyWithoutFriendsNestedInputObjectSchema)
      .optional(),
    servers: z
      .lazy(() => ServerUpdateManyWithoutMembersNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUpdateWithoutSentRequestsInputObjectSchema = Schema;
