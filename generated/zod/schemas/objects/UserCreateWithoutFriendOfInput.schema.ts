import { z } from 'zod';
import { UserCreateblockedInputObjectSchema } from './UserCreateblockedInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { AuthCreateNestedOneWithoutIdInputObjectSchema } from './AuthCreateNestedOneWithoutIdInput.schema';
import { FriendRequestCreateNestedManyWithoutReceiverInputObjectSchema } from './FriendRequestCreateNestedManyWithoutReceiverInput.schema';
import { FriendRequestCreateNestedManyWithoutSenderInputObjectSchema } from './FriendRequestCreateNestedManyWithoutSenderInput.schema';
import { MessagesCreateNestedManyWithoutAuthorInputObjectSchema } from './MessagesCreateNestedManyWithoutAuthorInput.schema';
import { VoiceChatCreateNestedOneWithoutMembersInputObjectSchema } from './VoiceChatCreateNestedOneWithoutMembersInput.schema';
import { ChannelCreateNestedManyWithoutDirectMsgForInputObjectSchema } from './ChannelCreateNestedManyWithoutDirectMsgForInput.schema';
import { UserCreateNestedManyWithoutFriendOfInputObjectSchema } from './UserCreateNestedManyWithoutFriendOfInput.schema';
import { ServerCreateNestedManyWithoutMembersInputObjectSchema } from './ServerCreateNestedManyWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.UserCreateWithoutFriendOfInput> = z
  .object({
    id: z.string(),
    username: z.string(),
    avatarUrl: z.string().optional().nullable(),
    blocked: z
      .union([
        z.lazy(() => UserCreateblockedInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    variables: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    auth: z
      .lazy(() => AuthCreateNestedOneWithoutIdInputObjectSchema)
      .optional(),
    receivedRequests: z
      .lazy(() => FriendRequestCreateNestedManyWithoutReceiverInputObjectSchema)
      .optional(),
    sentRequests: z
      .lazy(() => FriendRequestCreateNestedManyWithoutSenderInputObjectSchema)
      .optional(),
    messages: z
      .lazy(() => MessagesCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
    VoiceChat: z
      .lazy(() => VoiceChatCreateNestedOneWithoutMembersInputObjectSchema)
      .optional(),
    directMsgs: z
      .lazy(() => ChannelCreateNestedManyWithoutDirectMsgForInputObjectSchema)
      .optional(),
    friends: z
      .lazy(() => UserCreateNestedManyWithoutFriendOfInputObjectSchema)
      .optional(),
    servers: z
      .lazy(() => ServerCreateNestedManyWithoutMembersInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutFriendOfInputObjectSchema = Schema;
