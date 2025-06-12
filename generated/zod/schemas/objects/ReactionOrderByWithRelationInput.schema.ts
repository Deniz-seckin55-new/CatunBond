import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MessagesOrderByWithRelationInputObjectSchema } from './MessagesOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    emojiName: z.lazy(() => SortOrderSchema).optional(),
    messageId: z.lazy(() => SortOrderSchema).optional(),
    channelId: z.lazy(() => SortOrderSchema).optional(),
    message: z
      .lazy(() => MessagesOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict();

export const ReactionOrderByWithRelationInputObjectSchema = Schema;
