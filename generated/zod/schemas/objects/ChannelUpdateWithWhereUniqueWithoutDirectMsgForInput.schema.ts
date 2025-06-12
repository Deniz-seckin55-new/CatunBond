import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithoutDirectMsgForInputObjectSchema } from './ChannelUpdateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedUpdateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedUpdateWithoutDirectMsgForInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpdateWithWhereUniqueWithoutDirectMsgForInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ChannelUpdateWithoutDirectMsgForInputObjectSchema),
        z.lazy(
          () => ChannelUncheckedUpdateWithoutDirectMsgForInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ChannelUpdateWithWhereUniqueWithoutDirectMsgForInputObjectSchema =
  Schema;
