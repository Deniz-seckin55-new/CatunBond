import { z } from 'zod';
import { FriendRequestCreateWithoutReceiverInputObjectSchema } from './FriendRequestCreateWithoutReceiverInput.schema';
import { FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedCreateWithoutReceiverInput.schema';
import { FriendRequestCreateOrConnectWithoutReceiverInputObjectSchema } from './FriendRequestCreateOrConnectWithoutReceiverInput.schema';
import { FriendRequestUpsertWithWhereUniqueWithoutReceiverInputObjectSchema } from './FriendRequestUpsertWithWhereUniqueWithoutReceiverInput.schema';
import { FriendRequestCreateManyReceiverInputEnvelopeObjectSchema } from './FriendRequestCreateManyReceiverInputEnvelope.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithWhereUniqueWithoutReceiverInputObjectSchema } from './FriendRequestUpdateWithWhereUniqueWithoutReceiverInput.schema';
import { FriendRequestUpdateManyWithWhereWithoutReceiverInputObjectSchema } from './FriendRequestUpdateManyWithWhereWithoutReceiverInput.schema';
import { FriendRequestScalarWhereInputObjectSchema } from './FriendRequestScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateManyWithoutReceiverNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FriendRequestCreateWithoutReceiverInputObjectSchema),
          z
            .lazy(() => FriendRequestCreateWithoutReceiverInputObjectSchema)
            .array(),
          z.lazy(
            () => FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => FriendRequestCreateOrConnectWithoutReceiverInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestCreateOrConnectWithoutReceiverInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              FriendRequestUpsertWithWhereUniqueWithoutReceiverInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpsertWithWhereUniqueWithoutReceiverInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => FriendRequestCreateManyReceiverInputEnvelopeObjectSchema)
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
              FriendRequestUpdateWithWhereUniqueWithoutReceiverInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpdateWithWhereUniqueWithoutReceiverInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              FriendRequestUpdateManyWithWhereWithoutReceiverInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                FriendRequestUpdateManyWithWhereWithoutReceiverInputObjectSchema,
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

export const FriendRequestUpdateManyWithoutReceiverNestedInputObjectSchema =
  Schema;
