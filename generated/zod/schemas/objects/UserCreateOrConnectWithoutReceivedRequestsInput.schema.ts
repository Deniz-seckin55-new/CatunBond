import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutReceivedRequestsInputObjectSchema } from './UserCreateWithoutReceivedRequestsInput.schema';
import { UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedCreateWithoutReceivedRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutReceivedRequestsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutReceivedRequestsInputObjectSchema),
        z.lazy(
          () => UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const UserCreateOrConnectWithoutReceivedRequestsInputObjectSchema =
  Schema;
