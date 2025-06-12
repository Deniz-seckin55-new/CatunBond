import { z } from 'zod';
import { UserCreateWithoutReceivedRequestsInputObjectSchema } from './UserCreateWithoutReceivedRequestsInput.schema';
import { UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedCreateWithoutReceivedRequestsInput.schema';
import { UserCreateOrConnectWithoutReceivedRequestsInputObjectSchema } from './UserCreateOrConnectWithoutReceivedRequestsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutReceivedRequestsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutReceivedRequestsInputObjectSchema),
          z.lazy(
            () => UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutReceivedRequestsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutReceivedRequestsInputObjectSchema =
  Schema;
