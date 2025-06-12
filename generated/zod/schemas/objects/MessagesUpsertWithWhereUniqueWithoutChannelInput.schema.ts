import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutChannelInputObjectSchema } from './MessagesUpdateWithoutChannelInput.schema';
import { MessagesUncheckedUpdateWithoutChannelInputObjectSchema } from './MessagesUncheckedUpdateWithoutChannelInput.schema';
import { MessagesCreateWithoutChannelInputObjectSchema } from './MessagesCreateWithoutChannelInput.schema';
import { MessagesUncheckedCreateWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateWithoutChannelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpsertWithWhereUniqueWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MessagesUpdateWithoutChannelInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutChannelInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema),
        z.lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpsertWithWhereUniqueWithoutChannelInputObjectSchema =
  Schema;
