import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { VoiceChatCountOrderByAggregateInputObjectSchema } from './VoiceChatCountOrderByAggregateInput.schema';
import { VoiceChatMaxOrderByAggregateInputObjectSchema } from './VoiceChatMaxOrderByAggregateInput.schema';
import { VoiceChatMinOrderByAggregateInputObjectSchema } from './VoiceChatMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatOrderByWithAggregationInput> = z
  .object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    serverId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => VoiceChatCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => VoiceChatMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => VoiceChatMinOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const VoiceChatOrderByWithAggregationInputObjectSchema = Schema;
