import { z } from 'zod';
import { VoiceChatWhereUniqueInputObjectSchema } from './objects/VoiceChatWhereUniqueInput.schema';
import { VoiceChatCreateInputObjectSchema } from './objects/VoiceChatCreateInput.schema';
import { VoiceChatUncheckedCreateInputObjectSchema } from './objects/VoiceChatUncheckedCreateInput.schema';
import { VoiceChatUpdateInputObjectSchema } from './objects/VoiceChatUpdateInput.schema';
import { VoiceChatUncheckedUpdateInputObjectSchema } from './objects/VoiceChatUncheckedUpdateInput.schema';

export const VoiceChatUpsertSchema = z.object({
  where: VoiceChatWhereUniqueInputObjectSchema,
  create: z.union([
    VoiceChatCreateInputObjectSchema,
    VoiceChatUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    VoiceChatUpdateInputObjectSchema,
    VoiceChatUncheckedUpdateInputObjectSchema,
  ]),
});
