import { z } from 'zod';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { MuteTypeSchema } from '../enums/MuteType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteCreateManyInput> = z
  .object({
    userId: z.string(),
    startedAt: z.coerce.date().optional(),
    endsAt: z.coerce.date(),
    mutedIn: z.string(),
    mutedInType: z.lazy(() => MutedInTypeSchema),
    muteType: z.lazy(() => MuteTypeSchema),
  })
  .strict();

export const UserMuteCreateManyInputObjectSchema = Schema;
