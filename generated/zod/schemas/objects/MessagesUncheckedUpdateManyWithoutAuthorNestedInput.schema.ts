import { z } from 'zod';
import { MessagesCreateWithoutAuthorInputObjectSchema } from './MessagesCreateWithoutAuthorInput.schema';
import { MessagesUncheckedCreateWithoutAuthorInputObjectSchema } from './MessagesUncheckedCreateWithoutAuthorInput.schema';
import { MessagesCreateOrConnectWithoutAuthorInputObjectSchema } from './MessagesCreateOrConnectWithoutAuthorInput.schema';
import { MessagesUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './MessagesUpsertWithWhereUniqueWithoutAuthorInput.schema';
import { MessagesCreateManyAuthorInputEnvelopeObjectSchema } from './MessagesCreateManyAuthorInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './MessagesUpdateWithWhereUniqueWithoutAuthorInput.schema';
import { MessagesUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './MessagesUpdateManyWithWhereWithoutAuthorInput.schema';
import { MessagesScalarWhereInputObjectSchema } from './MessagesScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUncheckedUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema),
          z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema).array(),
          z.lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema),
          z
            .lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MessagesCreateOrConnectWithoutAuthorInputObjectSchema),
          z
            .lazy(() => MessagesCreateOrConnectWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => MessagesUpsertWithWhereUniqueWithoutAuthorInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUpsertWithWhereUniqueWithoutAuthorInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MessagesCreateManyAuthorInputEnvelopeObjectSchema)
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
            () => MessagesUpdateWithWhereUniqueWithoutAuthorInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUpdateWithWhereUniqueWithoutAuthorInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MessagesUpdateManyWithWhereWithoutAuthorInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUpdateManyWithWhereWithoutAuthorInputObjectSchema,
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

export const MessagesUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema =
  Schema;
