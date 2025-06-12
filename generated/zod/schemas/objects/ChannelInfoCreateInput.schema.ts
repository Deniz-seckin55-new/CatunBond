import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { ChannelInfoCreatepinnedMessagesInputObjectSchema } from './ChannelInfoCreatepinnedMessagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoCreateInput> = z
  .object({
    channelId: z.string(),
    name: z.string(),
    type: z.lazy(() => ChannelTypeSchema),
    description: z.string(),
    slowMode: z.number().optional(),
    readOnly: z.boolean().optional(),
    nsfw: z.boolean().optional(),
    pinnedMessages: z
      .union([
        z.lazy(() => ChannelInfoCreatepinnedMessagesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const ChannelInfoCreateInputObjectSchema = Schema;
