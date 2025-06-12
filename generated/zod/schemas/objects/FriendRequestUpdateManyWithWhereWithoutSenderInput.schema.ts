import { z } from 'zod';
import { FriendRequestScalarWhereInputObjectSchema } from './FriendRequestScalarWhereInput.schema';
import { FriendRequestUpdateManyMutationInputObjectSchema } from './FriendRequestUpdateManyMutationInput.schema';
import { FriendRequestUncheckedUpdateManyWithoutSentRequestsInputObjectSchema } from './FriendRequestUncheckedUpdateManyWithoutSentRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestUpdateManyWithWhereWithoutSenderInput> =
  z
    .object({
      where: z.lazy(() => FriendRequestScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => FriendRequestUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            FriendRequestUncheckedUpdateManyWithoutSentRequestsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const FriendRequestUpdateManyWithWhereWithoutSenderInputObjectSchema =
  Schema;
