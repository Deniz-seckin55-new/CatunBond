import { z } from 'zod';
import { ChannelCreateWithoutMessagesInputObjectSchema } from './ChannelCreateWithoutMessagesInput.schema';
import { ChannelUncheckedCreateWithoutMessagesInputObjectSchema } from './ChannelUncheckedCreateWithoutMessagesInput.schema';
import { ChannelCreateOrConnectWithoutMessagesInputObjectSchema } from './ChannelCreateOrConnectWithoutMessagesInput.schema';
import { ChannelUpsertWithoutMessagesInputObjectSchema } from './ChannelUpsertWithoutMessagesInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithoutMessagesInputObjectSchema } from './ChannelUpdateWithoutMessagesInput.schema';
import { ChannelUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChannelUncheckedUpdateWithoutMessagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpdateOneRequiredWithoutMessagesNestedInput> =
  z
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
      upsert: z
        .lazy(() => ChannelUpsertWithoutMessagesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => ChannelWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => ChannelUpdateWithoutMessagesInputObjectSchema),
          z.lazy(() => ChannelUncheckedUpdateWithoutMessagesInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const ChannelUpdateOneRequiredWithoutMessagesNestedInputObjectSchema =
  Schema;
