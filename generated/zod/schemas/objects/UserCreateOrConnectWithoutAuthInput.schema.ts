import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAuthInputObjectSchema } from './UserCreateWithoutAuthInput.schema';
import { UserUncheckedCreateWithoutAuthInputObjectSchema } from './UserUncheckedCreateWithoutAuthInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutAuthInputObjectSchema = Schema;
