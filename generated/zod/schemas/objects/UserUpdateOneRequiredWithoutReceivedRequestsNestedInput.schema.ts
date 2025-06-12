import { z } from 'zod';
import { UserCreateWithoutReceivedRequestsInputObjectSchema } from './UserCreateWithoutReceivedRequestsInput.schema';
import { UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedCreateWithoutReceivedRequestsInput.schema';
import { UserCreateOrConnectWithoutReceivedRequestsInputObjectSchema } from './UserCreateOrConnectWithoutReceivedRequestsInput.schema';
import { UserUpsertWithoutReceivedRequestsInputObjectSchema } from './UserUpsertWithoutReceivedRequestsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutReceivedRequestsInputObjectSchema } from './UserUpdateWithoutReceivedRequestsInput.schema';
import { UserUncheckedUpdateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedUpdateWithoutReceivedRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReceivedRequestsNestedInput> =
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
      upsert: z
        .lazy(() => UserUpsertWithoutReceivedRequestsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutReceivedRequestsInputObjectSchema),
          z.lazy(
            () => UserUncheckedUpdateWithoutReceivedRequestsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutReceivedRequestsNestedInputObjectSchema =
  Schema;
