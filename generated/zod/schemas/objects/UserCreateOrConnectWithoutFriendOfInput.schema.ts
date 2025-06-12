import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutFriendOfInputObjectSchema } from './UserCreateWithoutFriendOfInput.schema';
import { UserUncheckedCreateWithoutFriendOfInputObjectSchema } from './UserUncheckedCreateWithoutFriendOfInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutFriendOfInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutFriendOfInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutFriendOfInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutFriendOfInputObjectSchema = Schema;
