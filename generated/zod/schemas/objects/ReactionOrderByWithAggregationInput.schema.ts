import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ReactionCountOrderByAggregateInputObjectSchema } from './ReactionCountOrderByAggregateInput.schema';
import { ReactionMaxOrderByAggregateInputObjectSchema } from './ReactionMaxOrderByAggregateInput.schema';
import { ReactionMinOrderByAggregateInputObjectSchema } from './ReactionMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    emojiName: z.lazy(() => SortOrderSchema).optional(),
    messageId: z.lazy(() => SortOrderSchema).optional(),
    channelId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ReactionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => ReactionMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ReactionMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ReactionOrderByWithAggregationInputObjectSchema = Schema;
