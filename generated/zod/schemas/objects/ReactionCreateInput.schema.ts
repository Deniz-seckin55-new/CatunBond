import { z } from 'zod';
import { MessagesCreateNestedOneWithoutReactionsInputObjectSchema } from './MessagesCreateNestedOneWithoutReactionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionCreateInput> = z
  .object({
    id: z.string(),
    userId: z.string(),
    emojiName: z.string(),
    channelId: z.string(),
    message: z.lazy(
      () => MessagesCreateNestedOneWithoutReactionsInputObjectSchema,
    ),
  })
  .strict();

export const ReactionCreateInputObjectSchema = Schema;
