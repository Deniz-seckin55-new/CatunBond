import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithoutReceiverInputObjectSchema } from './FriendRequestUpdateWithoutReceiverInput.schema';
import { FriendRequestUncheckedUpdateWithoutReceiverInputObjectSchema } from './FriendRequestUncheckedUpdateWithoutReceiverInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateWithWhereUniqueWithoutReceiverInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => FriendRequestUpdateWithoutReceiverInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedUpdateWithoutReceiverInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpdateWithWhereUniqueWithoutReceiverInputObjectSchema =
  Schema;
