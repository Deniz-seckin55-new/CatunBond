import { z } from 'zod';
import { UserCreateWithoutFriendOfInputObjectSchema } from './UserCreateWithoutFriendOfInput.schema';
import { UserUncheckedCreateWithoutFriendOfInputObjectSchema } from './UserUncheckedCreateWithoutFriendOfInput.schema';
import { UserCreateOrConnectWithoutFriendOfInputObjectSchema } from './UserCreateOrConnectWithoutFriendOfInput.schema';
import { UserUpsertWithWhereUniqueWithoutFriendOfInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutFriendOfInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutFriendOfInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutFriendOfInput.schema';
import { UserUpdateManyWithWhereWithoutFriendOfInputObjectSchema } from './UserUpdateManyWithWhereWithoutFriendOfInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateManyWithoutFriendOfNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutFriendOfInputObjectSchema),
        z
          .lazy(() => UserUpsertWithWhereUniqueWithoutFriendOfInputObjectSchema)
          .array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithWhereUniqueWithoutFriendOfInputObjectSchema),
        z
          .lazy(() => UserUpdateWithWhereUniqueWithoutFriendOfInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutFriendOfInputObjectSchema),
        z
          .lazy(() => UserUpdateManyWithWhereWithoutFriendOfInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserScalarWhereInputObjectSchema),
        z.lazy(() => UserScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateManyWithoutFriendOfNestedInputObjectSchema = Schema;
