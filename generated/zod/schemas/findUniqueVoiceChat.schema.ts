import { z } from 'zod';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';

export const VoiceChatFindUniqueSchema = z.object({
  where: VoiceChatWhereUniqueInputObjectSchema,
});
