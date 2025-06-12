import { z } from 'zod';
import { UserCreateWithoutDirectMsgsInputObjectSchema } from './UserCreateWithoutDirectMsgsInput.schema';
import { UserUncheckedCreateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateWithoutDirectMsgsInput.schema';
import { UserCreateOrConnectWithoutDirectMsgsInputObjectSchema } from './UserCreateOrConnectWithoutDirectMsgsInput.schema';
import { UserUpsertWithWhereUniqueWithoutDirectMsgsInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutDirectMsgsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutDirectMsgsInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutDirectMsgsInput.schema';
import { UserUpdateManyWithWhereWithoutDirectMsgsInputObjectSchema } from './UserUpdateManyWithWhereWithoutDirectMsgsInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutDirectMsgsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema),
          z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema),
          z
            .lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutDirectMsgsInputObjectSchema),
          z
            .lazy(() => UserCreateOrConnectWithoutDirectMsgsInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => UserUpsertWithWhereUniqueWithoutDirectMsgsInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpsertWithWhereUniqueWithoutDirectMsgsInputObjectSchema,
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
            () => UserUpdateWithWhereUniqueWithoutDirectMsgsInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateWithWhereUniqueWithoutDirectMsgsInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => UserUpdateManyWithWhereWithoutDirectMsgsInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateManyWithWhereWithoutDirectMsgsInputObjectSchema,
            )
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

export const UserUncheckedUpdateManyWithoutDirectMsgsNestedInputObjectSchema =
  Schema;
