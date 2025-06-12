import { z } from 'zod';
import { MessagesCreateWithoutChannelInputObjectSchema } from './MessagesCreateWithoutChannelInput.schema';
import { MessagesUncheckedCreateWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateWithoutChannelInput.schema';
import { MessagesCreateOrConnectWithoutChannelInputObjectSchema } from './MessagesCreateOrConnectWithoutChannelInput.schema';
import { MessagesUpsertWithWhereUniqueWithoutChannelInputObjectSchema } from './MessagesUpsertWithWhereUniqueWithoutChannelInput.schema';
import { MessagesCreateManyChannelInputEnvelopeObjectSchema } from './MessagesCreateManyChannelInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithWhereUniqueWithoutChannelInputObjectSchema } from './MessagesUpdateWithWhereUniqueWithoutChannelInput.schema';
import { MessagesUpdateManyWithWhereWithoutChannelInputObjectSchema } from './MessagesUpdateManyWithWhereWithoutChannelInput.schema';
import { MessagesScalarWhereInputObjectSchema } from './MessagesScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUncheckedUpdateManyWithoutChannelNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema),
          z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema).array(),
          z.lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema),
          z
            .lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MessagesCreateOrConnectWithoutChannelInputObjectSchema),
          z
            .lazy(() => MessagesCreateOrConnectWithoutChannelInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => MessagesUpsertWithWhereUniqueWithoutChannelInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MessagesUpsertWithWhereUniqueWithoutChannelInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MessagesCreateManyChannelInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => MessagesUpdateWithWhereUniqueWithoutChannelInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MessagesUpdateWithWhereUniqueWithoutChannelInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MessagesUpdateManyWithWhereWithoutChannelInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUpdateManyWithWhereWithoutChannelInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MessagesScalarWhereInputObjectSchema),
          z.lazy(() => MessagesScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MessagesUncheckedUpdateManyWithoutChannelNestedInputObjectSchema =
  Schema;
