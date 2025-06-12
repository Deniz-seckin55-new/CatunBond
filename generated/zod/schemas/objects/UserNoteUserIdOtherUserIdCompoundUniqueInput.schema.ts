import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteUserIdOtherUserIdCompoundUniqueInput> = z
  .object({
    userId: z.string(),
    otherUserId: z.string(),
  })
  .strict();

export const UserNoteUserIdOtherUserIdCompoundUniqueInputObjectSchema = Schema;
