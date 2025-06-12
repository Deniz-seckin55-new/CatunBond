import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutRepliedToInputObjectSchema } from './MessagesUpdateWithoutRepliedToInput.schema';
import { MessagesUncheckedUpdateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedUpdateWithoutRepliedToInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateWithWhereUniqueWithoutRepliedToInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MessagesUpdateWithoutRepliedToInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutRepliedToInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpdateWithWhereUniqueWithoutRepliedToInputObjectSchema =
  Schema;
