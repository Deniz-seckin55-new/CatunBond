import { z } from 'zod';
import { UserCreateWithoutFriendsInputObjectSchema } from './UserCreateWithoutFriendsInput.schema';
import { UserUncheckedCreateWithoutFriendsInputObjectSchema } from './UserUncheckedCreateWithoutFriendsInput.schema';
import { UserCreateOrConnectWithoutFriendsInputObjectSchema } from './UserCreateOrConnectWithoutFriendsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutFriendsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFriendsInputObjectSchema),
          z.lazy(() => UserCreateWithoutFriendsInputObjectSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFriendsInputObjectSchema),
          z
            .lazy(() => UserUncheckedCreateWithoutFriendsInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFriendsInputObjectSchema),
          z
            .lazy(() => UserCreateOrConnectWithoutFriendsInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedCreateNestedManyWithoutFriendsInputObjectSchema =
  Schema;
