import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoAvgOrderByAggregateInput> = z
  .object({
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ServerInfoAvgOrderByAggregateInputObjectSchema = Schema;
