import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateManyCategoryInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    channelType: z.lazy(() => ChannelTypeSchema).optional(),
    index: z.number().optional(),
  })
  .strict();

export const ChannelCreateManyCategoryInputObjectSchema = Schema;
