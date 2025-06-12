import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutFriendOfInputObjectSchema } from './UserUpdateWithoutFriendOfInput.schema';
import { UserUncheckedUpdateWithoutFriendOfInputObjectSchema } from './UserUncheckedUpdateWithoutFriendOfInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutFriendOfInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutFriendOfInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFriendOfInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutFriendOfInputObjectSchema = Schema;
