import { z } from 'zod';
import { FriendRequestCreateWithoutSenderInputObjectSchema } from './FriendRequestCreateWithoutSenderInput.schema';
import { FriendRequestUncheckedCreateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedCreateWithoutSenderInput.schema';
import { FriendRequestCreateOrConnectWithoutSenderInputObjectSchema } from './FriendRequestCreateOrConnectWithoutSenderInput.schema';
import { FriendRequestUpsertWithWhereUniqueWithoutSenderInputObjectSchema } from './FriendRequestUpsertWithWhereUniqueWithoutSenderInput.schema';
import { FriendRequestCreateManySenderInputEnvelopeObjectSchema } from './FriendRequestCreateManySenderInputEnvelope.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithWhereUniqueWithoutSenderInputObjectSchema } from './FriendRequestUpdateWithWhereUniqueWithoutSenderInput.schema';
import { FriendRequestUpdateManyWithWhereWithoutSenderInputObjectSchema } from './FriendRequestUpdateManyWithWhereWithoutSenderInput.schema';
import { FriendRequestScalarWhereInputObjectSchema } from './FriendRequestScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateManyWithoutSenderNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FriendRequestCreateWithoutSenderInputObjectSchema),
          z
            .lazy(() => FriendRequestCreateWithoutSenderInputObjectSchema)
            .array(),
          z.lazy(
            () => FriendRequestUncheckedCreateWithoutSenderInputObjectSchema,
          ),
          z
            .lazy(
              () => FriendRequestUncheckedCreateWithoutSenderInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => FriendRequestCreateOrConnectWithoutSenderInputObjectSchema,
          ),
          z
            .lazy(
              () => FriendRequestCreateOrConnectWithoutSenderInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              FriendRequestUpsertWithWhereUniqueWithoutSenderInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpsertWithWhereUniqueWithoutSenderInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => FriendRequestCreateManySenderInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              FriendRequestUpdateWithWhereUniqueWithoutSenderInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpdateWithWhereUniqueWithoutSenderInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              FriendRequestUpdateManyWithWhereWithoutSenderInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpdateManyWithWhereWithoutSenderInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FriendRequestScalarWhereInputObjectSchema),
          z.lazy(() => FriendRequestScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const FriendRequestUpdateManyWithoutSenderNestedInputObjectSchema =
  Schema;
