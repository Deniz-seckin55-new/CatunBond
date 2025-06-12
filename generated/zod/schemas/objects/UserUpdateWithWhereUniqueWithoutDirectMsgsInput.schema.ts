import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDirectMsgsInputObjectSchema } from './UserUpdateWithoutDirectMsgsInput.schema';
import { UserUncheckedUpdateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedUpdateWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutDirectMsgsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutDirectMsgsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDirectMsgsInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutDirectMsgsInputObjectSchema =
  Schema;
