import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FriendRequestCountOrderByAggregateInputObjectSchema } from './FriendRequestCountOrderByAggregateInput.schema';
import { FriendRequestMaxOrderByAggregateInputObjectSchema } from './FriendRequestMaxOrderByAggregateInput.schema';
import { FriendRequestMinOrderByAggregateInputObjectSchema } from './FriendRequestMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    senderId: z.lazy(() => SortOrderSchema).optional(),
    receiverId: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => FriendRequestCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => FriendRequestMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => FriendRequestMinOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const FriendRequestOrderByWithAggregationInputObjectSchema = Schema;
