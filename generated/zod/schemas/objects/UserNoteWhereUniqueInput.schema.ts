import { z } from 'zod';
import { UserNoteUserIdOtherUserIdCompoundUniqueInputObjectSchema } from './UserNoteUserIdOtherUserIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteWhereUniqueInput> = z
  .object({
    userId_otherUserId: z
      .lazy(() => UserNoteUserIdOtherUserIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserNoteWhereUniqueInputObjectSchema = Schema;
