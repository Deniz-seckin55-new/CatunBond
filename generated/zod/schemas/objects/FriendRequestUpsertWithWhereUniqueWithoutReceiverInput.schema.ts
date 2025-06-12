import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithoutReceiverInputObjectSchema } from './FriendRequestUpdateWithoutReceiverInput.schema';
import { FriendRequestUncheckedUpdateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedUpdateWithoutReceiverInput.schema';
import { FriendRequestCreateWithoutReceiverInputObjectSchema } from './FriendRequestCreateWithoutReceiverInput.schema';
import { FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedCreateWithoutReceiverInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpsertWithWhereUniqueWithoutReceiverInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => FriendRequestUpdateWithoutReceiverInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedUpdateWithoutReceiverInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => FriendRequestCreateWithoutReceiverInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedCreateWithoutReceiverInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpsertWithWhereUniqueWithoutReceiverInputObjectSchema =
  Schema;
