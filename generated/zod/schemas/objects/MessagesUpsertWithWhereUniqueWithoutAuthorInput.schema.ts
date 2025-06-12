import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutAuthorInputObjectSchema } from './MessagesUpdateWithoutAuthorInput.schema';
import { MessagesUncheckedUpdateWithoutAuthorInputObjectSchema } from './MessagesUncheckedUpdateWithoutAuthorInput.schema';
import { MessagesCreateWithoutAuthorInputObjectSchema } from './MessagesCreateWithoutAuthorInput.schema';
import { MessagesUncheckedCreateWithoutAuthorInputObjectSchema } from './MessagesUncheckedCreateWithoutAuthorInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpsertWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MessagesUpdateWithoutAuthorInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutAuthorInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpsertWithWhereUniqueWithoutAuthorInputObjectSchema =
  Schema;
