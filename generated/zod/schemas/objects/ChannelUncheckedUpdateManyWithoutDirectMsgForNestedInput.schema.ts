import { z } from 'zod';
import { ChannelCreateWithoutDirectMsgForInputObjectSchema } from './ChannelCreateWithoutDirectMsgForInput.schema';
import { ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema } from './ChannelUncheckedCreateWithoutDirectMsgForInput.schema';
import { ChannelCreateOrConnectWithoutDirectMsgForInputObjectSchema } from './ChannelCreateOrConnectWithoutDirectMsgForInput.schema';
import { ChannelUpsertWithWhereUniqueWithoutDirectMsgForInputObjectSchema } from './ChannelUpsertWithWhereUniqueWithoutDirectMsgForInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithWhereUniqueWithoutDirectMsgForInputObjectSchema } from './ChannelUpdateWithWhereUniqueWithoutDirectMsgForInput.schema';
import { ChannelUpdateManyWithWhereWithoutDirectMsgForInputObjectSchema } from './ChannelUpdateManyWithWhereWithoutDirectMsgForInput.schema';
import { ChannelScalarWhereInputObjectSchema } from './ChannelScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedUpdateManyWithoutDirectMsgForNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ChannelUpsertWithWhereUniqueWithoutDirectMsgForInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ChannelUpsertWithWhereUniqueWithoutDirectMsgForInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ChannelUpdateWithWhereUniqueWithoutDirectMsgForInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ChannelUpdateWithWhereUniqueWithoutDirectMsgForInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ChannelUpdateManyWithWhereWithoutDirectMsgForInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ChannelUpdateManyWithWhereWithoutDirectMsgForInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ChannelScalarWhereInputObjectSchema),
          z.lazy(() => ChannelScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelUncheckedUpdateManyWithoutDirectMsgForNestedInputObjectSchema =
  Schema;
