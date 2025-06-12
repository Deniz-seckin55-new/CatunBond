import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithoutSenderInputObjectSchema } from './FriendRequestUpdateWithoutSenderInput.schema';
import { FriendRequestUncheckedUpdateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedUpdateWithoutSenderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateWithWhereUniqueWithoutSenderInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => FriendRequestUpdateWithoutSenderInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedUpdateWithoutSenderInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpdateWithWhereUniqueWithoutSenderInputObjectSchema =
  Schema;
