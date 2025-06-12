import { z } from 'zod';
import { FriendRequestCreateWithoutSenderInputObjectSchema } from './FriendRequestCreateWithoutSenderInput.schema';
import { FriendRequestUncheckedCreateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedCreateWithoutSenderInput.schema';
import { FriendRequestCreateOrConnectWithoutSenderInputObjectSchema } from './FriendRequestCreateOrConnectWithoutSenderInput.schema';
import { FriendRequestCreateManySenderInputEnvelopeObjectSchema } from './FriendRequestCreateManySenderInputEnvelope.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUncheckedCreateNestedManyWithoutSenderInput> =
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
      createMany: z
        .lazy(() => FriendRequestCreateManySenderInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
          z.lazy(() => FriendRequestWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const FriendRequestUncheckedCreateNestedManyWithoutSenderInputObjectSchema =
  Schema;
