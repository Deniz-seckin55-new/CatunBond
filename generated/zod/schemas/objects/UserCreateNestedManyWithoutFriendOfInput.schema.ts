import { z } from 'zod';
import { UserCreateWithoutFriendOfInputObjectSchema } from './UserCreateWithoutFriendOfInput.schema';
import { UserUncheckedCreateWithoutFriendOfInputObjectSchema } from './UserUncheckedCreateWithoutFriendOfInput.schema';
import { UserCreateOrConnectWithoutFriendOfInputObjectSchema } from './UserCreateOrConnectWithoutFriendOfInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutFriendOfInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutFriendOfInputObjectSchema),
        z.lazy(() => UserCreateWithoutFriendOfInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutFriendOfInputObjectSchema),
        z
          .lazy(() => UserUncheckedCreateWithoutFriendOfInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutFriendOfInputObjectSchema),
        z
          .lazy(() => UserCreateOrConnectWithoutFriendOfInputObjectSchema)
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

export const UserCreateNestedManyWithoutFriendOfInputObjectSchema = Schema;
