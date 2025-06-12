import { z } from 'zod';
import { FriendRequestCreateWithoutReceiverInputObjectSchema } from './FriendRequestCreateWithoutReceiverInput.schema';
import { FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedCreateWithoutReceiverInput.schema';
import { FriendRequestCreateOrConnectWithoutReceiverInputObjectSchema } from './FriendRequestCreateOrConnectWithoutReceiverInput.schema';
import { FriendRequestCreateManyReceiverInputEnvelopeObjectSchema } from './FriendRequestCreateManyReceiverInputEnvelope.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateNestedManyWithoutReceiverInput> =
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
      createMany: z
        .lazy(() => FriendRequestCreateManyReceiverInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const FriendRequestCreateNestedManyWithoutReceiverInputObjectSchema =
  Schema;
