import { z } from 'zod';
import { VoiceChatWhereInputObjectSchema } from './objects/VoiceChatWhereInput.schema';

export const VoiceChatDeleteManySchema = z.object({
  where: VoiceChatWhereInputObjectSchema.optional(),
});
