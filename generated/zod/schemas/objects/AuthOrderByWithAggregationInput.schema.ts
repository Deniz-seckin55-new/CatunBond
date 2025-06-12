import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AuthCountOrderByAggregateInputObjectSchema } from './AuthCountOrderByAggregateInput.schema';
import { AuthMaxOrderByAggregateInputObjectSchema } from './AuthMaxOrderByAggregateInput.schema';
import { AuthMinOrderByAggregateInputObjectSchema } from './AuthMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthOrderByWithAggregationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    password_hash: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => AuthCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => AuthMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => AuthMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const AuthOrderByWithAggregationInputObjectSchema = Schema;
