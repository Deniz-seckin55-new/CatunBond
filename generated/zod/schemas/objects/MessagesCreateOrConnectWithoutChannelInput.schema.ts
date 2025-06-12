import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesCreateWithoutChannelInputObjectSchema } from './MessagesCreateWithoutChannelInput.schema';
import { MessagesUncheckedCreateWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateWithoutChannelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateOrConnectWithoutChannelInput> = z
  .object({
    where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesCreateOrConnectWithoutChannelInputObjectSchema = Schema;
