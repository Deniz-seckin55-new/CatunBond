import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutRepliedToInputObjectSchema } from './MessagesUpdateWithoutRepliedToInput.schema';
import { MessagesUncheckedUpdateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedUpdateWithoutRepliedToInput.schema';
import { MessagesCreateWithoutRepliedToInputObjectSchema } from './MessagesCreateWithoutRepliedToInput.schema';
import { MessagesUncheckedCreateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliedToInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpsertWithWhereUniqueWithoutRepliedToInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MessagesUpdateWithoutRepliedToInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutRepliedToInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema),
        z.lazy(() => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpsertWithWhereUniqueWithoutRepliedToInputObjectSchema =
  Schema;
