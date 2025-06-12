import { z } from 'zod';
import { FriendRequestScalarWhereInputObjectSchema } from './FriendRequestScalarWhereInput.schema';
import { FriendRequestUpdateManyMutationInputObjectSchema } from './FriendRequestUpdateManyMutationInput.schema';
import { FriendRequestUncheckedUpdateManyWithoutReceivedRequestsInputObjectSchema } from './FriendRequestUncheckedUpdateManyWithoutReceivedRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateManyWithWhereWithoutReceiverInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => FriendRequestUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            FriendRequestUncheckedUpdateManyWithoutReceivedRequestsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpdateManyWithWhereWithoutReceiverInputObjectSchema =
  Schema;
