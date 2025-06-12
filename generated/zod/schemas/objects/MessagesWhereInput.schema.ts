import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ChannelRelationFilterObjectSchema } from './ChannelRelationFilter.schema';
import { ChannelWhereInputObjectSchema } from './ChannelWhereInput.schema';
import { MessagesRelationFilterObjectSchema } from './MessagesRelationFilter.schema';
import { MessagesListRelationFilterObjectSchema } from './MessagesListRelationFilter.schema';
import { ReactionListRelationFilterObjectSchema } from './ReactionListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MessagesWhereInputObjectSchema),
        z.lazy(() => MessagesWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MessagesWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MessagesWhereInputObjectSchema),
        z.lazy(() => MessagesWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    timestamp: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    repliedToId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    attachments: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    mentions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    author: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    channel: z
      .union([
        z.lazy(() => ChannelRelationFilterObjectSchema),
        z.lazy(() => ChannelWhereInputObjectSchema),
      ])
      .optional(),
    repliedTo: z
      .union([
        z.lazy(() => MessagesRelationFilterObjectSchema),
        z.lazy(() => MessagesWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    replies: z.lazy(() => MessagesListRelationFilterObjectSchema).optional(),
    reactions: z.lazy(() => ReactionListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const MessagesWhereInputObjectSchema = Schema;
