import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServerCountOrderByAggregateInputObjectSchema } from './ServerCountOrderByAggregateInput.schema';
import { ServerMaxOrderByAggregateInputObjectSchema } from './ServerMaxOrderByAggregateInput.schema';
import { ServerMinOrderByAggregateInputObjectSchema } from './ServerMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    iconUrl: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    ownerId: z.lazy(() => SortOrderSchema).optional(),
    invites: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ServerCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => ServerMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ServerMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ServerOrderByWithAggregationInputObjectSchema = Schema;
