import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelCreateWithoutMessagesInputObjectSchema } from './ChannelCreateWithoutMessagesInput.schema';
import { ChannelUncheckedCreateWithoutMessagesInputObjectSchema } from './ChannelUncheckedCreateWithoutMessagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutMessagesInput> = z
  .object({
    where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ChannelCreateWithoutMessagesInputObjectSchema),
      z.lazy(() => ChannelUncheckedCreateWithoutMessagesInputObjectSchema),
    ]),
  })
  .strict();

export const ChannelCreateOrConnectWithoutMessagesInputObjectSchema = Schema;
