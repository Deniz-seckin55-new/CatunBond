import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutMessageInput> = z
  .object({
    id: z.string(),
    userId: z.string(),
    emojiName: z.string(),
    channelId: z.string(),
  })
  .strict();

export const ReactionUncheckedCreateWithoutMessageInputObjectSchema = Schema;
