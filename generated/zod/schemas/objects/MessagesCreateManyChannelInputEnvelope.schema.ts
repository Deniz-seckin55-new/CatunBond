import { z } from 'zod';
import { MessagesCreateManyChannelInputObjectSchema } from './MessagesCreateManyChannelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateManyChannelInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MessagesCreateManyChannelInputObjectSchema),
      z.lazy(() => MessagesCreateManyChannelInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MessagesCreateManyChannelInputEnvelopeObjectSchema = Schema;
