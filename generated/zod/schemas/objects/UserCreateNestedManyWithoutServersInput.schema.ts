import { z } from 'zod';
import { UserCreateWithoutServersInputObjectSchema } from './UserCreateWithoutServersInput.schema';
import { UserUncheckedCreateWithoutServersInputObjectSchema } from './UserUncheckedCreateWithoutServersInput.schema';
import { UserCreateOrConnectWithoutServersInputObjectSchema } from './UserCreateOrConnectWithoutServersInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutServersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutServersInputObjectSchema),
        z.lazy(() => UserCreateWithoutServersInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutServersInputObjectSchema),
        z
          .lazy(() => UserUncheckedCreateWithoutServersInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutServersInputObjectSchema),
        z
          .lazy(() => UserCreateOrConnectWithoutServersInputObjectSchema)
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

export const UserCreateNestedManyWithoutServersInputObjectSchema = Schema;
