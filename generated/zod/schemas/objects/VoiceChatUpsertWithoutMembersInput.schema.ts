import { z } from 'zod';
import { VoiceChatUpdateWithoutMembersInputObjectSchema } from './VoiceChatUpdateWithoutMembersInput.schema';
import { VoiceChatUncheckedUpdateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedUpdateWithoutMembersInput.schema';
import { VoiceChatCreateWithoutMembersInputObjectSchema } from './VoiceChatCreateWithoutMembersInput.schema';
import { VoiceChatUncheckedCreateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedCreateWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatUpsertWithoutMembersInput> = z
  .object({
    update: z.union([
      z.lazy(() => VoiceChatUpdateWithoutMembersInputObjectSchema),
      z.lazy(() => VoiceChatUncheckedUpdateWithoutMembersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => VoiceChatCreateWithoutMembersInputObjectSchema),
      z.lazy(() => VoiceChatUncheckedCreateWithoutMembersInputObjectSchema),
    ]),
  })
  .strict();

export const VoiceChatUpsertWithoutMembersInputObjectSchema = Schema;
