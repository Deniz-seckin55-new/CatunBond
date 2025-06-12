import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesCreateWithoutRepliedToInputObjectSchema } from './MessagesCreateWithoutRepliedToInput.schema';
import { MessagesUncheckedCreateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliedToInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateOrConnectWithoutRepliedToInput> = z
  .object({
    where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesCreateOrConnectWithoutRepliedToInputObjectSchema = Schema;
