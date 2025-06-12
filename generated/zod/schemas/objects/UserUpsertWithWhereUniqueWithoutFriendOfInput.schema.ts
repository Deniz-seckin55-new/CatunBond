import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutFriendOfInputObjectSchema } from './UserUpdateWithoutFriendOfInput.schema';
import { UserUncheckedUpdateWithoutFriendOfInputObjectSchema } from './UserUncheckedUpdateWithoutFriendOfInput.schema';
import { UserCreateWithoutFriendOfInputObjectSchema } from './UserCreateWithoutFriendOfInput.schema';
import { UserUncheckedCreateWithoutFriendOfInputObjectSchema } from './UserUncheckedCreateWithoutFriendOfInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutFriendOfInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutFriendOfInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFriendOfInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutFriendOfInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutFriendOfInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutFriendOfInputObjectSchema = Schema;
