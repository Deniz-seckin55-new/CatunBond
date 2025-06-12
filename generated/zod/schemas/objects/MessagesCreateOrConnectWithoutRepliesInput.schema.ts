import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesCreateWithoutRepliesInputObjectSchema } from './MessagesCreateWithoutRepliesInput.schema';
import { MessagesUncheckedCreateWithoutRepliesInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateOrConnectWithoutRepliesInput> = z
  .object({
    where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutRepliesInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutRepliesInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesCreateOrConnectWithoutRepliesInputObjectSchema = Schema;
