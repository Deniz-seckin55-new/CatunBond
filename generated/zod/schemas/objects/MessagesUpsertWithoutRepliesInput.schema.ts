import { z } from 'zod';
import { MessagesUpdateWithoutRepliesInputObjectSchema } from './MessagesUpdateWithoutRepliesInput.schema';
import { MessagesUncheckedUpdateWithoutRepliesInputObjectSchema } from './MessagesUncheckedUpdateWithoutRepliesInput.schema';
import { MessagesCreateWithoutRepliesInputObjectSchema } from './MessagesCreateWithoutRepliesInput.schema';
import { MessagesUncheckedCreateWithoutRepliesInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpsertWithoutRepliesInput> = z
  .object({
    update: z.union([
      z.lazy(() => MessagesUpdateWithoutRepliesInputObjectSchema),
      z.lazy(() => MessagesUncheckedUpdateWithoutRepliesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutRepliesInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutRepliesInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesUpsertWithoutRepliesInputObjectSchema = Schema;
