import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    timestamp: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    channelId: z.lazy(() => SortOrderSchema).optional(),
    repliedToId: z.lazy(() => SortOrderSchema).optional(),
    attachments: z.lazy(() => SortOrderSchema).optional(),
    mentions: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const MessagesCountOrderByAggregateInputObjectSchema = Schema;
