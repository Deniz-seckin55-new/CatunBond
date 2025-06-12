import { z } from 'zod';
import { UserUpdateWithoutAuthInputObjectSchema } from './UserUpdateWithoutAuthInput.schema';
import { UserUncheckedUpdateWithoutAuthInputObjectSchema } from './UserUncheckedUpdateWithoutAuthInput.schema';
import { UserCreateWithoutAuthInputObjectSchema } from './UserCreateWithoutAuthInput.schema';
import { UserUncheckedCreateWithoutAuthInputObjectSchema } from './UserUncheckedCreateWithoutAuthInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutAuthInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAuthInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAuthInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutAuthInputObjectSchema = Schema;
