import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    content: z.literal(true).optional(),
    timestamp: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    channelId: z.literal(true).optional(),
    repliedToId: z.literal(true).optional(),
    attachments: z.literal(true).optional(),
    mentions: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const MessagesCountAggregateInputObjectSchema = Schema;
