import { z } from 'zod';
import { VoiceChatOrderByWithRelationInputObjectSchema } from './objects/VoiceChatOrderByWithRelationInput.schema';
import { VoiceChatWhereInputObjectSchema } from './objects/VoiceChatWhereInput.schema';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';
import { VoiceChatCountAggregateInputObjectSchema } from './objects/VoiceChatCountAggregateInput.schema';
import { VoiceChatMinAggregateInputObjectSchema } from './objects/VoiceChatMinAggregateInput.schema';
import { VoiceChatMaxAggregateInputObjectSchema } from './objects/VoiceChatMaxAggregateInput.schema';

export const VoiceChatAggregateSchema = z.object({
  orderBy: z
    .union([
      VoiceChatOrderByWithRelationInputObjectSchema,
      VoiceChatOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: VoiceChatWhereInputObjectSchema.optional(),
  cursor: VoiceChatWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), VoiceChatCountAggregateInputObjectSchema])
    .optional(),
  _min: VoiceChatMinAggregateInputObjectSchema.optional(),
  _max: VoiceChatMaxAggregateInputObjectSchema.optional(),
});
