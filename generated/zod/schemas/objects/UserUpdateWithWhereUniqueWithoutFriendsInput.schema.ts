import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutFriendsInputObjectSchema } from './UserUpdateWithoutFriendsInput.schema';
import { UserUncheckedUpdateWithoutFriendsInputObjectSchema } from './UserUncheckedUpdateWithoutFriendsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutFriendsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutFriendsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutFriendsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpdateWithWhereUniqueWithoutFriendsInputObjectSchema = Schema;
