import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoCountOrderByAggregateInput> = z
  .object({
    serverId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    iconUrl: z.lazy(() => SortOrderSchema).optional(),
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
    color: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    slogan: z.lazy(() => SortOrderSchema).optional(),
    rules: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ServerInfoCountOrderByAggregateInputObjectSchema = Schema;
