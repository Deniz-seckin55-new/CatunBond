import { z } from 'zod';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';

export const VoiceChatDeleteOneSchema = z.object({
  where: VoiceChatWhereUniqueInputObjectSchema,
});
