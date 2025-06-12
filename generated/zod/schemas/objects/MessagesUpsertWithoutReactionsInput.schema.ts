import { z } from 'zod';
import { MessagesUpdateWithoutReactionsInputObjectSchema } from './MessagesUpdateWithoutReactionsInput.schema';
import { MessagesUncheckedUpdateWithoutReactionsInputObjectSchema } from './MessagesUncheckedUpdateWithoutReactionsInput.schema';
import { MessagesCreateWithoutReactionsInputObjectSchema } from './MessagesCreateWithoutReactionsInput.schema';
import { MessagesUncheckedCreateWithoutReactionsInputObjectSchema } from './MessagesUncheckedCreateWithoutReactionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpsertWithoutReactionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MessagesUpdateWithoutReactionsInputObjectSchema),
      z.lazy(() => MessagesUncheckedUpdateWithoutReactionsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutReactionsInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutReactionsInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesUpsertWithoutReactionsInputObjectSchema = Schema;
