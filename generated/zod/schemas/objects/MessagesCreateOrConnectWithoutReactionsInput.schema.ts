import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesCreateWithoutReactionsInputObjectSchema } from './MessagesCreateWithoutReactionsInput.schema';
import { MessagesUncheckedCreateWithoutReactionsInputObjectSchema } from './MessagesUncheckedCreateWithoutReactionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateOrConnectWithoutReactionsInput> = z
  .object({
    where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutReactionsInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutReactionsInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesCreateOrConnectWithoutReactionsInputObjectSchema = Schema;
