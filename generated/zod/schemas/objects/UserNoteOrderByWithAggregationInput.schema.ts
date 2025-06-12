import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserNoteCountOrderByAggregateInputObjectSchema } from './UserNoteCountOrderByAggregateInput.schema';
import { UserNoteMaxOrderByAggregateInputObjectSchema } from './UserNoteMaxOrderByAggregateInput.schema';
import { UserNoteMinOrderByAggregateInputObjectSchema } from './UserNoteMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteOrderByWithAggregationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    otherUserId: z.lazy(() => SortOrderSchema).optional(),
    note: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => UserNoteCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => UserNoteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserNoteMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserNoteOrderByWithAggregationInputObjectSchema = Schema;
