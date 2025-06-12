import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoUpdatepinnedMessagesInput> = z
  .object({
    set: z.string().array().optional(),
  })
  .strict();

export const ChannelInfoUpdatepinnedMessagesInputObjectSchema = Schema;
