import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteMinAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
    otherUserId: z.literal(true).optional(),
    note: z.literal(true).optional(),
  })
  .strict();

export const UserNoteMinAggregateInputObjectSchema = Schema;
