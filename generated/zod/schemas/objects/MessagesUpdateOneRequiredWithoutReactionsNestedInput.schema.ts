import { z } from 'zod';
import { MessagesCreateWithoutReactionsInputObjectSchema } from './MessagesCreateWithoutReactionsInput.schema';
import { MessagesUncheckedCreateWithoutReactionsInputObjectSchema } from './MessagesUncheckedCreateWithoutReactionsInput.schema';
import { MessagesCreateOrConnectWithoutReactionsInputObjectSchema } from './MessagesCreateOrConnectWithoutReactionsInput.schema';
import { MessagesUpsertWithoutReactionsInputObjectSchema } from './MessagesUpsertWithoutReactionsInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutReactionsInputObjectSchema } from './MessagesUpdateWithoutReactionsInput.schema';
import { MessagesUncheckedUpdateWithoutReactionsInputObjectSchema } from './MessagesUncheckedUpdateWithoutReactionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateOneRequiredWithoutReactionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutReactionsInputObjectSchema),
          z.lazy(
            () => MessagesUncheckedCreateWithoutReactionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MessagesCreateOrConnectWithoutReactionsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => MessagesUpsertWithoutReactionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MessagesWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => MessagesUpdateWithoutReactionsInputObjectSchema),
          z.lazy(
            () => MessagesUncheckedUpdateWithoutReactionsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MessagesUpdateOneRequiredWithoutReactionsNestedInputObjectSchema =
  Schema;
