import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ServerInfoCountOrderByAggregateInputObjectSchema } from './ServerInfoCountOrderByAggregateInput.schema';
import { ServerInfoAvgOrderByAggregateInputObjectSchema } from './ServerInfoAvgOrderByAggregateInput.schema';
import { ServerInfoMaxOrderByAggregateInputObjectSchema } from './ServerInfoMaxOrderByAggregateInput.schema';
import { ServerInfoMinOrderByAggregateInputObjectSchema } from './ServerInfoMinOrderByAggregateInput.schema';
import { ServerInfoSumOrderByAggregateInputObjectSchema } from './ServerInfoSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoOrderByWithAggregationInput> = z
  .object({
    serverId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    iconUrl: z.lazy(() => SortOrderSchema).optional(),
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
    color: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    slogan: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    rules: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ServerInfoCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => ServerInfoAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => ServerInfoMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => ServerInfoMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => ServerInfoSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerInfoOrderByWithAggregationInputObjectSchema = Schema;
