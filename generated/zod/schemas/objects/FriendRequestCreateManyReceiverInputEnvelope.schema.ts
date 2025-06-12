import { z } from 'zod';
import { FriendRequestCreateManyReceiverInputObjectSchema } from './FriendRequestCreateManyReceiverInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateManyReceiverInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => FriendRequestCreateManyReceiverInputObjectSchema),
      z.lazy(() => FriendRequestCreateManyReceiverInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const FriendRequestCreateManyReceiverInputEnvelopeObjectSchema = Schema;
