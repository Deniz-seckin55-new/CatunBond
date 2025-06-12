import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { MessagesRelationFilterObjectSchema } from './MessagesRelationFilter.schema';
import { MessagesWhereInputObjectSchema } from './MessagesWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ReactionWhereInputObjectSchema),
        z.lazy(() => ReactionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ReactionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ReactionWhereInputObjectSchema),
        z.lazy(() => ReactionWhereInputObjectSchema).array(),
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
    message: z
      .union([
        z.lazy(() => MessagesRelationFilterObjectSchema),
        z.lazy(() => MessagesWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ReactionWhereInputObjectSchema = Schema;
