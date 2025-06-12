import { z } from 'zod';
import { FriendRequestCreateManySenderInputObjectSchema } from './FriendRequestCreateManySenderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateManySenderInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => FriendRequestCreateManySenderInputObjectSchema),
      z.lazy(() => FriendRequestCreateManySenderInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const FriendRequestCreateManySenderInputEnvelopeObjectSchema = Schema;
