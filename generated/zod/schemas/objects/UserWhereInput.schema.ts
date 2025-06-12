import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { AuthRelationFilterObjectSchema } from './AuthRelationFilter.schema';
import { AuthWhereInputObjectSchema } from './AuthWhereInput.schema';
import { FriendRequestListRelationFilterObjectSchema } from './FriendRequestListRelationFilter.schema';
import { MessagesListRelationFilterObjectSchema } from './MessagesListRelationFilter.schema';
import { VoiceChatRelationFilterObjectSchema } from './VoiceChatRelationFilter.schema';
import { VoiceChatWhereInputObjectSchema } from './VoiceChatWhereInput.schema';
import { ChannelListRelationFilterObjectSchema } from './ChannelListRelationFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';
import { ServerListRelationFilterObjectSchema } from './ServerListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    username: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    avatarUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    blocked: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    voiceChatChannelId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    variables: z.lazy(() => JsonFilterObjectSchema).optional(),
    auth: z
      .union([
        z.lazy(() => AuthRelationFilterObjectSchema),
        z.lazy(() => AuthWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    receivedRequests: z
      .lazy(() => FriendRequestListRelationFilterObjectSchema)
      .optional(),
    sentRequests: z
      .lazy(() => FriendRequestListRelationFilterObjectSchema)
      .optional(),
    messages: z.lazy(() => MessagesListRelationFilterObjectSchema).optional(),
    VoiceChat: z
      .union([
        z.lazy(() => VoiceChatRelationFilterObjectSchema),
        z.lazy(() => VoiceChatWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    directMsgs: z.lazy(() => ChannelListRelationFilterObjectSchema).optional(),
    friends: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
    friendOf: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
    servers: z.lazy(() => ServerListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
