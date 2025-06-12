import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithoutDirectMsgForInputObjectSchema } from './ChannelUpdateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedUpdateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedUpdateWithoutDirectMsgForInput.schema';
import { ChannelCreateWithoutDirectMsgForInputObjectSchema } from './ChannelCreateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedCreateWithoutDirectMsgForInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpsertWithWhereUniqueWithoutDirectMsgForInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ChannelUpdateWithoutDirectMsgForInputObjectSchema),
        z.lazy(
          () => ChannelUncheckedUpdateWithoutDirectMsgForInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ChannelCreateWithoutDirectMsgForInputObjectSchema),
        z.lazy(
          () => ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ChannelUpsertWithWhereUniqueWithoutDirectMsgForInputObjectSchema =
  Schema;
