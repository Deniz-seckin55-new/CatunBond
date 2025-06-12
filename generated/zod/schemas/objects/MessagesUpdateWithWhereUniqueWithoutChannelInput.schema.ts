import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutChannelInputObjectSchema } from './MessagesUpdateWithoutChannelInput.schema';
import { MessagesUncheckedUpdateWithoutChannelInputObjectSchema } from './MessagesUncheckedUpdateWithoutChannelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateWithWhereUniqueWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MessagesUpdateWithoutChannelInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutChannelInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpdateWithWhereUniqueWithoutChannelInputObjectSchema =
  Schema;
