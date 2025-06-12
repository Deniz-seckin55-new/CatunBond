import { z } from 'zod';
import { VoiceChatUpdateInputObjectSchema } from './objects/VoiceChatUpdateInput.schema';
import { VoiceChatUncheckedUpdateInputObjectSchema } from './objects/VoiceChatUncheckedUpdateInput.schema';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';

export const VoiceChatUpdateOneSchema = z.object({
  data: z.union([
    VoiceChatUpdateInputObjectSchema,
    VoiceChatUncheckedUpdateInputObjectSchema,
  ]),
  where: VoiceChatWhereUniqueInputObjectSchema,
});
