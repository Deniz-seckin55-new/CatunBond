import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuthOrderByWithRelationInputObjectSchema } from './AuthOrderByWithRelationInput.schema';
import { FriendRequestOrderByRelationAggregateInputObjectSchema } from './FriendRequestOrderByRelationAggregateInput.schema';
import { MessagesOrderByRelationAggregateInputObjectSchema } from './MessagesOrderByRelationAggregateInput.schema';
import { VoiceChatOrderByWithRelationInputObjectSchema } from './VoiceChatOrderByWithRelationInput.schema';
import { ChannelOrderByRelationAggregateInputObjectSchema } from './ChannelOrderByRelationAggregateInput.schema';
import { UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema';
import { ServerOrderByRelationAggregateInputObjectSchema } from './ServerOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    avatarUrl: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    voiceChatChannelId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    variables: z.lazy(() => SortOrderSchema).optional(),
    auth: z.lazy(() => AuthOrderByWithRelationInputObjectSchema).optional(),
    receivedRequests: z
      .lazy(() => FriendRequestOrderByRelationAggregateInputObjectSchema)
      .optional(),
    sentRequests: z
      .lazy(() => FriendRequestOrderByRelationAggregateInputObjectSchema)
      .optional(),
    messages: z
      .lazy(() => MessagesOrderByRelationAggregateInputObjectSchema)
      .optional(),
    VoiceChat: z
      .lazy(() => VoiceChatOrderByWithRelationInputObjectSchema)
      .optional(),
    directMsgs: z
      .lazy(() => ChannelOrderByRelationAggregateInputObjectSchema)
      .optional(),
    friends: z
      .lazy(() => UserOrderByRelationAggregateInputObjectSchema)
      .optional(),
    friendOf: z
      .lazy(() => UserOrderByRelationAggregateInputObjectSchema)
      .optional(),
    servers: z
      .lazy(() => ServerOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;
