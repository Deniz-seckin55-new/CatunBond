import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ChannelCountOrderByAggregateInputObjectSchema } from './ChannelCountOrderByAggregateInput.schema';
import { ChannelAvgOrderByAggregateInputObjectSchema } from './ChannelAvgOrderByAggregateInput.schema';
import { ChannelMaxOrderByAggregateInputObjectSchema } from './ChannelMaxOrderByAggregateInput.schema';
import { ChannelMinOrderByAggregateInputObjectSchema } from './ChannelMinOrderByAggregateInput.schema';
import { ChannelSumOrderByAggregateInputObjectSchema } from './ChannelSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    channelType: z.lazy(() => SortOrderSchema).optional(),
    categoryId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    index: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ChannelCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => ChannelAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ChannelMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ChannelMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ChannelSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ChannelOrderByWithAggregationInputObjectSchema = Schema;
