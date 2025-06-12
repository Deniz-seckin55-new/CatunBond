import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteCreateInput> = z
  .object({
    userId: z.string(),
    otherUserId: z.string(),
    note: z.string(),
  })
  .strict();

export const UserNoteCreateInputObjectSchema = Schema;
