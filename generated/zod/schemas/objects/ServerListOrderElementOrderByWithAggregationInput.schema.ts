import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ServerListOrderElementCountOrderByAggregateInputObjectSchema } from './ServerListOrderElementCountOrderByAggregateInput.schema';
import { ServerListOrderElementAvgOrderByAggregateInputObjectSchema } from './ServerListOrderElementAvgOrderByAggregateInput.schema';
import { ServerListOrderElementMaxOrderByAggregateInputObjectSchema } from './ServerListOrderElementMaxOrderByAggregateInput.schema';
import { ServerListOrderElementMinOrderByAggregateInputObjectSchema } from './ServerListOrderElementMinOrderByAggregateInput.schema';
import { ServerListOrderElementSumOrderByAggregateInputObjectSchema } from './ServerListOrderElementSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      serverId: z.lazy(() => SortOrderSchema).optional(),
      index: z.lazy(() => SortOrderSchema).optional(),
      userInfoUserId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      _count: z
        .lazy(
          () => ServerListOrderElementCountOrderByAggregateInputObjectSchema,
        )
        .optional(),
      _avg: z
        .lazy(() => ServerListOrderElementAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => ServerListOrderElementMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => ServerListOrderElementMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => ServerListOrderElementSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();

export const ServerListOrderElementOrderByWithAggregationInputObjectSchema =
  Schema;
