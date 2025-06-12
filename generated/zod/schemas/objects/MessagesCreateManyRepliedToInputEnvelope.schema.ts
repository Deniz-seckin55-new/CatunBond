import { z } from 'zod';
import { MessagesCreateManyRepliedToInputObjectSchema } from './MessagesCreateManyRepliedToInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateManyRepliedToInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MessagesCreateManyRepliedToInputObjectSchema),
      z.lazy(() => MessagesCreateManyRepliedToInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MessagesCreateManyRepliedToInputEnvelopeObjectSchema = Schema;
