import { z } from 'zod';
import { VoiceChatWhereInputObjectSchema } from './objects/VoiceChatWhereInput.schema';
import { VoiceChatOrderByWithAggregationInputObjectSchema } from './objects/VoiceChatOrderByWithAggregationInput.schema';
import { VoiceChatScalarWhereWithAggregatesInputObjectSchema } from './objects/VoiceChatScalarWhereWithAggregatesInput.schema';
import { VoiceChatScalarFieldEnumSchema } from './enums/VoiceChatScalarFieldEnum.schema';

export const VoiceChatGroupBySchema = z.object({
  where: VoiceChatWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      VoiceChatOrderByWithAggregationInputObjectSchema,
      VoiceChatOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: VoiceChatScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(VoiceChatScalarFieldEnumSchema),
});
