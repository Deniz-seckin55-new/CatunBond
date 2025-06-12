import { z } from 'zod';
import { MessagesCreateWithoutReactionsInputObjectSchema } from './MessagesCreateWithoutReactionsInput.schema';
import { MessagesUncheckedCreateWithoutReactionsInputObjectSchema } from './MessagesUncheckedCreateWithoutReactionsInput.schema';
import { MessagesCreateOrConnectWithoutReactionsInputObjectSchema } from './MessagesCreateOrConnectWithoutReactionsInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateNestedOneWithoutReactionsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MessagesCreateWithoutReactionsInputObjectSchema),
        z.lazy(() => MessagesUncheckedCreateWithoutReactionsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => MessagesCreateOrConnectWithoutReactionsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => MessagesWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MessagesCreateNestedOneWithoutReactionsInputObjectSchema = Schema;
