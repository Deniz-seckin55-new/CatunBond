import { z } from 'zod';
import { VoiceChatCreateManyInputObjectSchema } from './objects/VoiceChatCreateManyInput.schema';

export const VoiceChatCreateManySchema = z.object({
  data: z.union([
    VoiceChatCreateManyInputObjectSchema,
    z.array(VoiceChatCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
