import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestUpdateWithoutSenderInputObjectSchema } from './FriendRequestUpdateWithoutSenderInput.schema';
import { FriendRequestUncheckedUpdateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedUpdateWithoutSenderInput.schema';
import { FriendRequestCreateWithoutSenderInputObjectSchema } from './FriendRequestCreateWithoutSenderInput.schema';
import { FriendRequestUncheckedCreateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedCreateWithoutSenderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpsertWithWhereUniqueWithoutSenderInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => FriendRequestUpdateWithoutSenderInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedUpdateWithoutSenderInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => FriendRequestCreateWithoutSenderInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedCreateWithoutSenderInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpsertWithWhereUniqueWithoutSenderInputObjectSchema =
  Schema;
