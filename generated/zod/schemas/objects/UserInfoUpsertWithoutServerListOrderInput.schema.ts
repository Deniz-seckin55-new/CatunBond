import { z } from 'zod';
import { UserInfoUpdateWithoutServerListOrderInputObjectSchema } from './UserInfoUpdateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedUpdateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedUpdateWithoutServerListOrderInput.schema';
import { UserInfoCreateWithoutServerListOrderInputObjectSchema } from './UserInfoCreateWithoutServerListOrderInput.schema';
import { UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema } from './UserInfoUncheckedCreateWithoutServerListOrderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoUpsertWithoutServerListOrderInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserInfoUpdateWithoutServerListOrderInputObjectSchema),
      z.lazy(
        () => UserInfoUncheckedUpdateWithoutServerListOrderInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => UserInfoCreateWithoutServerListOrderInputObjectSchema),
      z.lazy(
        () => UserInfoUncheckedCreateWithoutServerListOrderInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const UserInfoUpsertWithoutServerListOrderInputObjectSchema = Schema;
