import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ChannelInfoCountOrderByAggregateInputObjectSchema } from './ChannelInfoCountOrderByAggregateInput.schema';
import { ChannelInfoAvgOrderByAggregateInputObjectSchema } from './ChannelInfoAvgOrderByAggregateInput.schema';
import { ChannelInfoMaxOrderByAggregateInputObjectSchema } from './ChannelInfoMaxOrderByAggregateInput.schema';
import { ChannelInfoMinOrderByAggregateInputObjectSchema } from './ChannelInfoMinOrderByAggregateInput.schema';
import { ChannelInfoSumOrderByAggregateInputObjectSchema } from './ChannelInfoSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoOrderByWithAggregationInput> = z
  .object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    slowMode: z.lazy(() => SortOrderSchema).optional(),
    readOnly: z.lazy(() => SortOrderSchema).optional(),
    nsfw: z.lazy(() => SortOrderSchema).optional(),
    pinnedMessages: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ChannelInfoCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => ChannelInfoAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => ChannelInfoMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => ChannelInfoMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => ChannelInfoSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const ChannelInfoOrderByWithAggregationInputObjectSchema = Schema;
