import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      index: z.lazy(() => SortOrderSchema).optional(),
      userInfoUserId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ServerListOrderElementCountOrderByAggregateInputObjectSchema =
  Schema;
