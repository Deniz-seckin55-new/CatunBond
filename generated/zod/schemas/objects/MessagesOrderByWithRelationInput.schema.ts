import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ChannelOrderByWithRelationInputObjectSchema } from './ChannelOrderByWithRelationInput.schema';
import { MessagesOrderByRelationAggregateInputObjectSchema } from './MessagesOrderByRelationAggregateInput.schema';
import { ReactionOrderByRelationAggregateInputObjectSchema } from './ReactionOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    timestamp: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    channelId: z.lazy(() => SortOrderSchema).optional(),
    repliedToId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    attachments: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    mentions: z.lazy(() => SortOrderSchema).optional(),
    author: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    channel: z
      .lazy(() => ChannelOrderByWithRelationInputObjectSchema)
      .optional(),
    repliedTo: z
      .lazy(() => MessagesOrderByWithRelationInputObjectSchema)
      .optional(),
    replies: z
      .lazy(() => MessagesOrderByRelationAggregateInputObjectSchema)
      .optional(),
    reactions: z
      .lazy(() => ReactionOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const MessagesOrderByWithRelationInputObjectSchema = Schema;
