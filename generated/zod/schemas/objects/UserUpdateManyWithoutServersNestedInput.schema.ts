import { z } from 'zod';
import { UserCreateWithoutServersInputObjectSchema } from './UserCreateWithoutServersInput.schema';
import { UserUncheckedCreateWithoutServersInputObjectSchema } from './UserUncheckedCreateWithoutServersInput.schema';
import { UserCreateOrConnectWithoutServersInputObjectSchema } from './UserCreateOrConnectWithoutServersInput.schema';
import { UserUpsertWithWhereUniqueWithoutServersInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutServersInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutServersInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutServersInput.schema';
import { UserUpdateManyWithWhereWithoutServersInputObjectSchema } from './UserUpdateManyWithWhereWithoutServersInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateManyWithoutServersNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutServersInputObjectSchema),
        z.lazy(() => UserCreateWithoutServersInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutServersInputObjectSchema),
        z
          .lazy(() => UserUncheckedCreateWithoutServersInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutServersInputObjectSchema),
        z
          .lazy(() => UserCreateOrConnectWithoutServersInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutServersInputObjectSchema),
        z
          .lazy(() => UserUpsertWithWhereUniqueWithoutServersInputObjectSchema)
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
        z.lazy(() => UserUpdateWithWhereUniqueWithoutServersInputObjectSchema),
        z
          .lazy(() => UserUpdateWithWhereUniqueWithoutServersInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutServersInputObjectSchema),
        z
          .lazy(() => UserUpdateManyWithWhereWithoutServersInputObjectSchema)
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

export const UserUpdateManyWithoutServersNestedInputObjectSchema = Schema;
