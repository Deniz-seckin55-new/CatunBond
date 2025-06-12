import { z } from 'zod';
import { ChannelCreateWithoutDirectMsgForInputObjectSchema } from './ChannelCreateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedCreateWithoutDirectMsgForInput.schema';
import { ChannelCreateOrConnectWithoutDirectMsgForInputObjectSchema } from './ChannelCreateOrConnectWithoutDirectMsgForInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateNestedManyWithoutDirectMsgForInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChannelCreateWithoutDirectMsgForInputObjectSchema),
          z
            .lazy(() => ChannelCreateWithoutDirectMsgForInputObjectSchema)
            .array(),
          z.lazy(
            () => ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema,
          ),
          z
            .lazy(
              () => ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ChannelCreateOrConnectWithoutDirectMsgForInputObjectSchema,
          ),
          z
            .lazy(
              () => ChannelCreateOrConnectWithoutDirectMsgForInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelCreateNestedManyWithoutDirectMsgForInputObjectSchema =
  Schema;
