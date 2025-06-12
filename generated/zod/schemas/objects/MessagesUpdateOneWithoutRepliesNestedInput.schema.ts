import { z } from 'zod';
import { MessagesCreateWithoutRepliesInputObjectSchema } from './MessagesCreateWithoutRepliesInput.schema';
import { MessagesUncheckedCreateWithoutRepliesInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliesInput.schema';
import { MessagesCreateOrConnectWithoutRepliesInputObjectSchema } from './MessagesCreateOrConnectWithoutRepliesInput.schema';
import { MessagesUpsertWithoutRepliesInputObjectSchema } from './MessagesUpsertWithoutRepliesInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutRepliesInputObjectSchema } from './MessagesUpdateWithoutRepliesInput.schema';
import { MessagesUncheckedUpdateWithoutRepliesInputObjectSchema } from './MessagesUncheckedUpdateWithoutRepliesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateOneWithoutRepliesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MessagesCreateWithoutRepliesInputObjectSchema),
        z.lazy(() => MessagesUncheckedCreateWithoutRepliesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => MessagesCreateOrConnectWithoutRepliesInputObjectSchema)
      .optional(),
    upsert: z
      .lazy(() => MessagesUpsertWithoutRepliesInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => MessagesWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => MessagesUpdateWithoutRepliesInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutRepliesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const MessagesUpdateOneWithoutRepliesNestedInputObjectSchema = Schema;
