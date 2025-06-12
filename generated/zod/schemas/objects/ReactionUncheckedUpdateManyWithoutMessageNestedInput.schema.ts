import { z } from 'zod';
import { ReactionCreateWithoutMessageInputObjectSchema } from './ReactionCreateWithoutMessageInput.schema';
import { ReactionUncheckedCreateWithoutMessageInputObjectSchema } from './ReactionUncheckedCreateWithoutMessageInput.schema';
import { ReactionCreateOrConnectWithoutMessageInputObjectSchema } from './ReactionCreateOrConnectWithoutMessageInput.schema';
import { ReactionUpsertWithWhereUniqueWithoutMessageInputObjectSchema } from './ReactionUpsertWithWhereUniqueWithoutMessageInput.schema';
import { ReactionCreateManyMessageInputEnvelopeObjectSchema } from './ReactionCreateManyMessageInputEnvelope.schema';
import { ReactionWhereUniqueInputObjectSchema } from './ReactionWhereUniqueInput.schema';
import { ReactionUpdateWithWhereUniqueWithoutMessageInputObjectSchema } from './ReactionUpdateWithWhereUniqueWithoutMessageInput.schema';
import { ReactionUpdateManyWithWhereWithoutMessageInputObjectSchema } from './ReactionUpdateManyWithWhereWithoutMessageInput.schema';
import { ReactionScalarWhereInputObjectSchema } from './ReactionScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutMessageNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema),
          z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema).array(),
          z.lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema),
          z
            .lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReactionCreateOrConnectWithoutMessageInputObjectSchema),
          z
            .lazy(() => ReactionCreateOrConnectWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ReactionUpsertWithWhereUniqueWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ReactionUpsertWithWhereUniqueWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReactionCreateManyMessageInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ReactionWhereUniqueInputObjectSchema),
          z.lazy(() => ReactionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ReactionWhereUniqueInputObjectSchema),
          z.lazy(() => ReactionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ReactionWhereUniqueInputObjectSchema),
          z.lazy(() => ReactionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReactionWhereUniqueInputObjectSchema),
          z.lazy(() => ReactionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ReactionUpdateWithWhereUniqueWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ReactionUpdateWithWhereUniqueWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ReactionUpdateManyWithWhereWithoutMessageInputObjectSchema,
          ),
          z
            .lazy(
              () => ReactionUpdateManyWithWhereWithoutMessageInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ReactionScalarWhereInputObjectSchema),
          z.lazy(() => ReactionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReactionUncheckedUpdateManyWithoutMessageNestedInputObjectSchema =
  Schema;
