import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteCountAggregateInputType> = z
  .object({
    userId: z.literal(true).optional(),
    startedAt: z.literal(true).optional(),
    endsAt: z.literal(true).optional(),
    mutedIn: z.literal(true).optional(),
    mutedInType: z.literal(true).optional(),
    muteType: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const UserMuteCountAggregateInputObjectSchema = Schema;
