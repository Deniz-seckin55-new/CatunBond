import { z } from 'zod';
import { VoiceChatCreateWithoutMembersInputObjectSchema } from './VoiceChatCreateWithoutMembersInput.schema';
import { VoiceChatUncheckedCreateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedCreateWithoutMembersInput.schema';
import { VoiceChatCreateOrConnectWithoutMembersInputObjectSchema } from './VoiceChatCreateOrConnectWithoutMembersInput.schema';
import { VoiceChatUpsertWithoutMembersInputObjectSchema } from './VoiceChatUpsertWithoutMembersInput.schema';
import { VoiceChatWhereUniqueInputObjectSchema } from './VoiceChatWhereUniqueInput.schema';
import { VoiceChatUpdateWithoutMembersInputObjectSchema } from './VoiceChatUpdateWithoutMembersInput.schema';
import { VoiceChatUncheckedUpdateWithoutMembersInputObjectSchema } from './VoiceChatUncheckedUpdateWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatUpdateOneWithoutMembersNestedInput> = z
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
    upsert: z
      .lazy(() => VoiceChatUpsertWithoutMembersInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => VoiceChatWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => VoiceChatUpdateWithoutMembersInputObjectSchema),
        z.lazy(() => VoiceChatUncheckedUpdateWithoutMembersInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const VoiceChatUpdateOneWithoutMembersNestedInputObjectSchema = Schema;
