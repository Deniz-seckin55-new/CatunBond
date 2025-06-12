import { z } from 'zod';
import { MessagesCreateWithoutRepliedToInputObjectSchema } from './MessagesCreateWithoutRepliedToInput.schema';
import { MessagesUncheckedCreateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliedToInput.schema';
import { MessagesCreateOrConnectWithoutRepliedToInputObjectSchema } from './MessagesCreateOrConnectWithoutRepliedToInput.schema';
import { MessagesUpsertWithWhereUniqueWithoutRepliedToInputObjectSchema } from './MessagesUpsertWithWhereUniqueWithoutRepliedToInput.schema';
import { MessagesCreateManyRepliedToInputEnvelopeObjectSchema } from './MessagesCreateManyRepliedToInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithWhereUniqueWithoutRepliedToInputObjectSchema } from './MessagesUpdateWithWhereUniqueWithoutRepliedToInput.schema';
import { MessagesUpdateManyWithWhereWithoutRepliedToInputObjectSchema } from './MessagesUpdateManyWithWhereWithoutRepliedToInput.schema';
import { MessagesScalarWhereInputObjectSchema } from './MessagesScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUncheckedUpdateManyWithoutRepliedToNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema),
          z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema).array(),
          z.lazy(
            () => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MessagesCreateOrConnectWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesCreateOrConnectWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              MessagesUpsertWithWhereUniqueWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MessagesUpsertWithWhereUniqueWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MessagesCreateManyRepliedToInputEnvelopeObjectSchema)
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
            () =>
              MessagesUpdateWithWhereUniqueWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MessagesUpdateWithWhereUniqueWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MessagesUpdateManyWithWhereWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MessagesUpdateManyWithWhereWithoutRepliedToInputObjectSchema,
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

export const MessagesUncheckedUpdateManyWithoutRepliedToNestedInputObjectSchema =
  Schema;
