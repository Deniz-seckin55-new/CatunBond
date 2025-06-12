import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MessagesCountOrderByAggregateInputObjectSchema } from './MessagesCountOrderByAggregateInput.schema';
import { MessagesMaxOrderByAggregateInputObjectSchema } from './MessagesMaxOrderByAggregateInput.schema';
import { MessagesMinOrderByAggregateInputObjectSchema } from './MessagesMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesOrderByWithAggregationInput> = z
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
    _count: z
      .lazy(() => MessagesCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => MessagesMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => MessagesMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MessagesOrderByWithAggregationInputObjectSchema = Schema;
