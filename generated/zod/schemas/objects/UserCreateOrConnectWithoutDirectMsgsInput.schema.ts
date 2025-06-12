import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutDirectMsgsInputObjectSchema } from './UserCreateWithoutDirectMsgsInput.schema';
import { UserUncheckedCreateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutDirectMsgsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutDirectMsgsInputObjectSchema = Schema;
