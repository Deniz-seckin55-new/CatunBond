import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    avatarUrl: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    voiceChatChannelId: z.lazy(() => SortOrderSchema).optional(),
    variables: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserCountOrderByAggregateInputObjectSchema = Schema;
