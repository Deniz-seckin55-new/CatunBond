import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ReactionScalarWhereInputObjectSchema),
        z.lazy(() => ReactionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ReactionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ReactionScalarWhereInputObjectSchema),
        z.lazy(() => ReactionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    emojiName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    messageId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const ReactionScalarWhereInputObjectSchema = Schema;
