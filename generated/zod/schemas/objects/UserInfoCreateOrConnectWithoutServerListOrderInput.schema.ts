import { z } from 'zod';
import { UserInfoWhereUniqueInputObjectSchema } from './UserInfoWhereUniqueInput.schema';
import { UserInfoCreateWithoutServerListOrderInputObjectSchema } from './UserInfoCreateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedCreateWithoutServerListOrderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoCreateOrConnectWithoutServerListOrderInput> =
  z
    .object({
      where: z.lazy(() => UserInfoWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserInfoCreateWithoutServerListOrderInputObjectSchema),
        z.lazy(
          () => UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const UserInfoCreateOrConnectWithoutServerListOrderInputObjectSchema =
  Schema;
