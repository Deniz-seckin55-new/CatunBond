import { z } from 'zod';
import { MessagesCreateManyAuthorInputObjectSchema } from './MessagesCreateManyAuthorInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateManyAuthorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MessagesCreateManyAuthorInputObjectSchema),
      z.lazy(() => MessagesCreateManyAuthorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MessagesCreateManyAuthorInputEnvelopeObjectSchema = Schema;
