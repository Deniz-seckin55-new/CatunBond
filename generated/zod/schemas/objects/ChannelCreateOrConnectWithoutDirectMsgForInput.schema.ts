import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelCreateWithoutDirectMsgForInputObjectSchema } from './ChannelCreateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedCreateWithoutDirectMsgForInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutDirectMsgForInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ChannelCreateWithoutDirectMsgForInputObjectSchema),
        z.lazy(
          () => ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ChannelCreateOrConnectWithoutDirectMsgForInputObjectSchema =
  Schema;
