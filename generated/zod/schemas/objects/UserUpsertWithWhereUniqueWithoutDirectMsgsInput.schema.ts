import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDirectMsgsInputObjectSchema } from './UserUpdateWithoutDirectMsgsInput.schema';
import { UserUncheckedUpdateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedUpdateWithoutDirectMsgsInput.schema';
import { UserCreateWithoutDirectMsgsInputObjectSchema } from './UserCreateWithoutDirectMsgsInput.schema';
import { UserUncheckedCreateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutDirectMsgsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutDirectMsgsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDirectMsgsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutDirectMsgsInputObjectSchema =
  Schema;
