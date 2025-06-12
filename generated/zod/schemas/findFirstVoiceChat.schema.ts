import { z } from 'zod';
import { VoiceChatOrderByWithRelationInputObjectSchema } from './objects/VoiceChatOrderByWithRelationInput.schema';
import { VoiceChatWhereInputObjectSchema } from './objects/VoiceChatWhereInput.schema';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';
import { VoiceChatScalarFieldEnumSchema } from './enums/VoiceChatScalarFieldEnum.schema';

export const VoiceChatFindFirstSchema = z.object({
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
  distinct: z.array(VoiceChatScalarFieldEnumSchema).optional(),
});
