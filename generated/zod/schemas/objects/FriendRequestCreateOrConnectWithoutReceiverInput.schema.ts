import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestCreateWithoutReceiverInputObjectSchema } from './FriendRequestCreateWithoutReceiverInput.schema';
import { FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedCreateWithoutReceiverInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateOrConnectWithoutReceiverInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => FriendRequestCreateWithoutReceiverInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestCreateOrConnectWithoutReceiverInputObjectSchema =
  Schema;
