import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteMaxOrderByAggregateInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endsAt: z.lazy(() => SortOrderSchema).optional(),
    mutedIn: z.lazy(() => SortOrderSchema).optional(),
    mutedInType: z.lazy(() => SortOrderSchema).optional(),
    muteType: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMuteMaxOrderByAggregateInputObjectSchema = Schema;
