import { z } from 'zod';
import { VoiceChatWhereUniqueInputObjectSchema } from './VoiceChatWhereUniqueInput.schema';
import { VoiceChatCreateWithoutMembersInputObjectSchema } from './VoiceChatCreateWithoutMembersInput.schema';
import { VoiceChatUncheckedCreateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedCreateWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatCreateOrConnectWithoutMembersInput> = z
  .object({
    where: z.lazy(() => VoiceChatWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => VoiceChatCreateWithoutMembersInputObjectSchema),
      z.lazy(() => VoiceChatUncheckedCreateWithoutMembersInputObjectSchema),
    ]),
  })
  .strict();

export const VoiceChatCreateOrConnectWithoutMembersInputObjectSchema = Schema;
