import { z } from 'zod';
import { VoiceChatUpdateManyMutationInputObjectSchema } from './objects/VoiceChatUpdateManyMutationInput.schema';
import { VoiceChatWhereInputObjectSchema } from './objects/VoiceChatWhereInput.schema';

export const VoiceChatUpdateManySchema = z.object({
  data: VoiceChatUpdateManyMutationInputObjectSchema,
  where: VoiceChatWhereInputObjectSchema.optional(),
});
