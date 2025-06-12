import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './FriendRequestWhereUniqueInput.schema';
import { FriendRequestCreateWithoutSenderInputObjectSchema } from './FriendRequestCreateWithoutSenderInput.schema';
import { FriendRequestUncheckedCreateWithoutSenderInputObjectSchema } from './FriendRequestUncheckedCreateWithoutSenderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestCreateOrConnectWithoutSenderInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => FriendRequestCreateWithoutSenderInputObjectSchema),
        z.lazy(
          () => FriendRequestUncheckedCreateWithoutSenderInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestCreateOrConnectWithoutSenderInputObjectSchema =
  Schema;
