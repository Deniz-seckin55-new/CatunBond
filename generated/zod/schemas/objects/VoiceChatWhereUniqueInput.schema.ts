import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatWhereUniqueInput> = z
  .object({
    channelId: z.string().optional(),
  })
  .strict();

export const VoiceChatWhereUniqueInputObjectSchema = Schema;
