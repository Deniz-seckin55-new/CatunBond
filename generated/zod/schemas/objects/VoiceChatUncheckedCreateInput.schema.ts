import { z } from 'zod';
import { UserUncheckedCreateNestedManyWithoutVoiceChatInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatUncheckedCreateInput> = z
  .object({
    channelId: z.string(),
    serverId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    members: z
      .lazy(
        () => UserUncheckedCreateNestedManyWithoutVoiceChatInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const VoiceChatUncheckedCreateInputObjectSchema = Schema;
