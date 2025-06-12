import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserNoteWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserNoteWhereInputObjectSchema),
        z.lazy(() => UserNoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserNoteWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserNoteWhereInputObjectSchema),
        z.lazy(() => UserNoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    otherUserId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    note: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const UserNoteWhereInputObjectSchema = Schema;
