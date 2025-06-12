import { z } from 'zod';
import { UserCreateWithoutDirectMsgsInputObjectSchema } from './UserCreateWithoutDirectMsgsInput.schema';
import { UserUncheckedCreateWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateWithoutDirectMsgsInput.schema';
import { UserCreateOrConnectWithoutDirectMsgsInputObjectSchema } from './UserCreateOrConnectWithoutDirectMsgsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutDirectMsgsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema),
        z.lazy(() => UserCreateWithoutDirectMsgsInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema),
        z
          .lazy(() => UserUncheckedCreateWithoutDirectMsgsInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutDirectMsgsInputObjectSchema),
        z
          .lazy(() => UserCreateOrConnectWithoutDirectMsgsInputObjectSchema)
          .array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserCreateNestedManyWithoutDirectMsgsInputObjectSchema = Schema;
