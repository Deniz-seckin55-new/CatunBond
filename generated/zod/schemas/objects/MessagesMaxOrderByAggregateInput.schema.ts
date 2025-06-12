import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    timestamp: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    channelId: z.lazy(() => SortOrderSchema).optional(),
    repliedToId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const MessagesMaxOrderByAggregateInputObjectSchema = Schema;
