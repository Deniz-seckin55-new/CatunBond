import { z } from 'zod';
import { ReactionCreateManyMessageInputObjectSchema } from './ReactionCreateManyMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionCreateManyMessageInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ReactionCreateManyMessageInputObjectSchema),
      z.lazy(() => ReactionCreateManyMessageInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ReactionCreateManyMessageInputEnvelopeObjectSchema = Schema;
