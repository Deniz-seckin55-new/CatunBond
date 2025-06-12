import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutFriendsInputObjectSchema } from './UserUpdateWithoutFriendsInput.schema';
import { UserUncheckedUpdateWithoutFriendsInputObjectSchema } from './UserUncheckedUpdateWithoutFriendsInput.schema';
import { UserCreateWithoutFriendsInputObjectSchema } from './UserCreateWithoutFriendsInput.schema';
import { UserUncheckedCreateWithoutFriendsInputObjectSchema } from './UserUncheckedCreateWithoutFriendsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutFriendsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserUpdateWithoutFriendsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutFriendsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutFriendsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutFriendsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithWhereUniqueWithoutFriendsInputObjectSchema = Schema;
