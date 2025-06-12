import { z } from 'zod';
import { UserCreateNestedManyWithoutVoiceChatInputObjectSchema } from './UserCreateNestedManyWithoutVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatCreateInput> = z
  .object({
    channelId: z.string(),
    serverId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    members: z
      .lazy(() => UserCreateNestedManyWithoutVoiceChatInputObjectSchema)
      .optional(),
  })
  .strict();

export const VoiceChatCreateInputObjectSchema = Schema;
