import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserMuteCountOrderByAggregateInputObjectSchema } from './UserMuteCountOrderByAggregateInput.schema';
import { UserMuteMaxOrderByAggregateInputObjectSchema } from './UserMuteMaxOrderByAggregateInput.schema';
import { UserMuteMinOrderByAggregateInputObjectSchema } from './UserMuteMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteOrderByWithAggregationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endsAt: z.lazy(() => SortOrderSchema).optional(),
    mutedIn: z.lazy(() => SortOrderSchema).optional(),
    mutedInType: z.lazy(() => SortOrderSchema).optional(),
    muteType: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => UserMuteCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => UserMuteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserMuteMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserMuteOrderByWithAggregationInputObjectSchema = Schema;
