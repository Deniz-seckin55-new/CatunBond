import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutFriendsInputObjectSchema } from './UserCreateWithoutFriendsInput.schema';
import { UserUncheckedCreateWithoutFriendsInputObjectSchema } from './UserUncheckedCreateWithoutFriendsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutFriendsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutFriendsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutFriendsInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutFriendsInputObjectSchema = Schema;
