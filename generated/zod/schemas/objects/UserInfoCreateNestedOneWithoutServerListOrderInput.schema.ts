import { z } from 'zod';
import { UserInfoCreateWithoutServerListOrderInputObjectSchema } from './UserInfoCreateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedCreateWithoutServerListOrderInput.schema';
import { UserInfoCreateOrConnectWithoutServerListOrderInputObjectSchema } from './UserInfoCreateOrConnectWithoutServerListOrderInput.schema';
import { UserInfoWhereUniqueInputObjectSchema } from './UserInfoWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoCreateNestedOneWithoutServerListOrderInput> =
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
      connect: z.lazy(() => UserInfoWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const UserInfoCreateNestedOneWithoutServerListOrderInputObjectSchema =
  Schema;
