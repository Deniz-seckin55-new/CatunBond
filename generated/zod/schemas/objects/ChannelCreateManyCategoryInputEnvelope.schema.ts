import { z } from 'zod';
import { ChannelCreateManyCategoryInputObjectSchema } from './ChannelCreateManyCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateManyCategoryInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ChannelCreateManyCategoryInputObjectSchema),
      z.lazy(() => ChannelCreateManyCategoryInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ChannelCreateManyCategoryInputEnvelopeObjectSchema = Schema;
