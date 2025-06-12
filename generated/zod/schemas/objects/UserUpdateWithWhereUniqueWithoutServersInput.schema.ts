import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutServersInputObjectSchema } from './UserUpdateWithoutServersInput.schema';
import { UserUncheckedUpdateWithoutServersInputObjectSchema } from './UserUncheckedUpdateWithoutServersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutServersInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutServersInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutServersInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpdateWithWhereUniqueWithoutServersInputObjectSchema = Schema;
