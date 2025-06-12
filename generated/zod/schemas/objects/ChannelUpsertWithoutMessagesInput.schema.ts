import { z } from 'zod';
import { ChannelUpdateWithoutMessagesInputObjectSchema } from './ChannelUpdateWithoutMessagesInput.schema';
import { ChannelUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChannelUncheckedUpdateWithoutMessagesInput.schema';
import { ChannelCreateWithoutMessagesInputObjectSchema } from './ChannelCreateWithoutMessagesInput.schema';
import { ChannelUncheckedCreateWithoutMessagesInputObjectSchema } from './ChannelUncheckedCreateWithoutMessagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpsertWithoutMessagesInput> = z
  .object({
    update: z.union([
      z.lazy(() => ChannelUpdateWithoutMessagesInputObjectSchema),
      z.lazy(() => ChannelUncheckedUpdateWithoutMessagesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ChannelCreateWithoutMessagesInputObjectSchema),
      z.lazy(() => ChannelUncheckedCreateWithoutMessagesInputObjectSchema),
    ]),
  })
  .strict();

export const ChannelUpsertWithoutMessagesInputObjectSchema = Schema;
