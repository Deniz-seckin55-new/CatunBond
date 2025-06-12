import { z } from 'zod';
import { UserCreateblockedInputObjectSchema } from './UserCreateblockedInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { AuthUncheckedCreateNestedOneWithoutIdInputObjectSchema } from './AuthUncheckedCreateNestedOneWithoutIdInput.schema';
import { FriendRequestUncheckedCreateNestedManyWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedCreateNestedManyWithoutReceiverInput.schema';
import { FriendRequestUncheckedCreateNestedManyWithoutSenderInputObjectSchema } from './FriendRequestUncheckedCreateNestedManyWithoutSenderInput.schema';
import { MessagesUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './MessagesUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { UserUncheckedCreateNestedManyWithoutFriendOfInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutFriendOfInput.schema';
import { UserUncheckedCreateNestedManyWithoutFriendsInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutFriendsInput.schema';
import { ServerUncheckedCreateNestedManyWithoutMembersInputObjectSchema } from './ServerUncheckedCreateNestedManyWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutDirectMsgsInput> = z
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
    voiceChatChannelId: z.string().optional().nullable(),
    variables: z
      .union([z.lazy(() => JsonNullValueInputSchema), jsonSchema])
      .optional(),
    auth: z
      .lazy(() => AuthUncheckedCreateNestedOneWithoutIdInputObjectSchema)
      .optional(),
    receivedRequests: z
      .lazy(
        () =>
          FriendRequestUncheckedCreateNestedManyWithoutReceiverInputObjectSchema,
      )
      .optional(),
    sentRequests: z
      .lazy(
        () =>
          FriendRequestUncheckedCreateNestedManyWithoutSenderInputObjectSchema,
      )
      .optional(),
    messages: z
      .lazy(
        () => MessagesUncheckedCreateNestedManyWithoutAuthorInputObjectSchema,
      )
      .optional(),
    friends: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutFriendOfInputObjectSchema)
      .optional(),
    friendOf: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutFriendsInputObjectSchema)
      .optional(),
    servers: z
      .lazy(
        () => ServerUncheckedCreateNestedManyWithoutMembersInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutDirectMsgsInputObjectSchema = Schema;
