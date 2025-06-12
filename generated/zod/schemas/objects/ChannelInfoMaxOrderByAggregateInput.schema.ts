import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoMaxOrderByAggregateInput> = z
  .object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    slowMode: z.lazy(() => SortOrderSchema).optional(),
    readOnly: z.lazy(() => SortOrderSchema).optional(),
    nsfw: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ChannelInfoMaxOrderByAggregateInputObjectSchema = Schema;
