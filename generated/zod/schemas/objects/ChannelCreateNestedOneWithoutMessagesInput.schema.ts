import { z } from 'zod';
import { ChannelCreateWithoutMessagesInputObjectSchema } from './ChannelCreateWithoutMessagesInput.schema';
import { ChannelUncheckedCreateWithoutMessagesInputObjectSchema } from './ChannelUncheckedCreateWithoutMessagesInput.schema';
import { ChannelCreateOrConnectWithoutMessagesInputObjectSchema } from './ChannelCreateOrConnectWithoutMessagesInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateNestedOneWithoutMessagesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ChannelCreateWithoutMessagesInputObjectSchema),
        z.lazy(() => ChannelUncheckedCreateWithoutMessagesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ChannelCreateOrConnectWithoutMessagesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ChannelWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ChannelCreateNestedOneWithoutMessagesInputObjectSchema = Schema;
