import { z } from 'zod';
import { VoiceChatCreateWithoutMembersInputObjectSchema } from './VoiceChatCreateWithoutMembersInput.schema';
import { VoiceChatUncheckedCreateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedCreateWithoutMembersInput.schema';
import { VoiceChatCreateOrConnectWithoutMembersInputObjectSchema } from './VoiceChatCreateOrConnectWithoutMembersInput.schema';
import { VoiceChatWhereUniqueInputObjectSchema } from './VoiceChatWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatCreateNestedOneWithoutMembersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => VoiceChatCreateWithoutMembersInputObjectSchema),
        z.lazy(() => VoiceChatUncheckedCreateWithoutMembersInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VoiceChatCreateOrConnectWithoutMembersInputObjectSchema)
      .optional(),
    connect: z.lazy(() => VoiceChatWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const VoiceChatCreateNestedOneWithoutMembersInputObjectSchema = Schema;
