import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserInfoCountOrderByAggregateInputObjectSchema } from './UserInfoCountOrderByAggregateInput.schema';
import { UserInfoMaxOrderByAggregateInputObjectSchema } from './UserInfoMaxOrderByAggregateInput.schema';
import { UserInfoMinOrderByAggregateInputObjectSchema } from './UserInfoMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoOrderByWithAggregationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    biography: z.lazy(() => SortOrderSchema).optional(),
    usernameColor: z.lazy(() => SortOrderSchema).optional(),
    mainLink: z.lazy(() => SortOrderSchema).optional(),
    shortDescription: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => UserInfoCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => UserInfoMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserInfoMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserInfoOrderByWithAggregationInputObjectSchema = Schema;
