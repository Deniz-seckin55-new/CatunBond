import { z } from 'zod';
import { MessagesCreateWithoutRepliesInputObjectSchema } from './MessagesCreateWithoutRepliesInput.schema';
import { MessagesUncheckedCreateWithoutRepliesInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliesInput.schema';
import { MessagesCreateOrConnectWithoutRepliesInputObjectSchema } from './MessagesCreateOrConnectWithoutRepliesInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateNestedOneWithoutRepliesInput> = z
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
    connect: z.lazy(() => MessagesWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MessagesCreateNestedOneWithoutRepliesInputObjectSchema = Schema;
