import { z } from 'zod';
import { UserCreateWithoutFriendsInputObjectSchema } from './UserCreateWithoutFriendsInput.schema';
import { UserUncheckedCreateWithoutFriendsInputObjectSchema } from './UserUncheckedCreateWithoutFriendsInput.schema';
import { UserCreateOrConnectWithoutFriendsInputObjectSchema } from './UserCreateOrConnectWithoutFriendsInput.schema';
import { UserUpsertWithWhereUniqueWithoutFriendsInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutFriendsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutFriendsInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutFriendsInput.schema';
import { UserUpdateManyWithWhereWithoutFriendsInputObjectSchema } from './UserUpdateManyWithWhereWithoutFriendsInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFriendsNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => UserUpsertWithWhereUniqueWithoutFriendsInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpsertWithWhereUniqueWithoutFriendsInputObjectSchema,
            )
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
          z.lazy(
            () => UserUpdateWithWhereUniqueWithoutFriendsInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateWithWhereUniqueWithoutFriendsInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutFriendsInputObjectSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutFriendsInputObjectSchema)
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

export const UserUncheckedUpdateManyWithoutFriendsNestedInputObjectSchema =
  Schema;
