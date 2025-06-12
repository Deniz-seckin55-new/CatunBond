import { z } from 'zod';
import { VoiceChatCreateInputObjectSchema } from './objects/VoiceChatCreateInput.schema';
import { VoiceChatUncheckedCreateInputObjectSchema } from './objects/VoiceChatUncheckedCreateInput.schema';

export const VoiceChatCreateOneSchema = z.object({
  data: z.union([
    VoiceChatCreateInputObjectSchema,
    VoiceChatUncheckedCreateInputObjectSchema,
  ]),
});
