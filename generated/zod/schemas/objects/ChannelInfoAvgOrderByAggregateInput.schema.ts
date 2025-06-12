import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoAvgOrderByAggregateInput> = z
  .object({
    slowMode: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ChannelInfoAvgOrderByAggregateInputObjectSchema = Schema;
