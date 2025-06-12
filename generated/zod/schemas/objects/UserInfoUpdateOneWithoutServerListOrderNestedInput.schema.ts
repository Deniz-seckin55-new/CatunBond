import { z } from 'zod';
import { UserInfoCreateWithoutServerListOrderInputObjectSchema } from './UserInfoCreateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedCreateWithoutServerListOrderInput.schema';
import { UserInfoCreateOrConnectWithoutServerListOrderInputObjectSchema } from './UserInfoCreateOrConnectWithoutServerListOrderInput.schema';
import { UserInfoUpsertWithoutServerListOrderInputObjectSchema } from './UserInfoUpsertWithoutServerListOrderInput.schema';
import { UserInfoWhereUniqueInputObjectSchema } from './UserInfoWhereUniqueInput.schema';
import { UserInfoUpdateWithoutServerListOrderInputObjectSchema } from './UserInfoUpdateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedUpdateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedUpdateWithoutServerListOrderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoUpdateOneWithoutServerListOrderNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserInfoCreateWithoutServerListOrderInputObjectSchema),
          z.lazy(
            () =>
              UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => UserInfoCreateOrConnectWithoutServerListOrderInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => UserInfoUpsertWithoutServerListOrderInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => UserInfoWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserInfoUpdateWithoutServerListOrderInputObjectSchema),
          z.lazy(
            () =>
              UserInfoUncheckedUpdateWithoutServerListOrderInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const UserInfoUpdateOneWithoutServerListOrderNestedInputObjectSchema =
  Schema;
