import { z } from 'zod';
import { UserCreateWithoutAuthInputObjectSchema } from './UserCreateWithoutAuthInput.schema';
import { UserUncheckedCreateWithoutAuthInputObjectSchema } from './UserUncheckedCreateWithoutAuthInput.schema';
import { UserCreateOrConnectWithoutAuthInputObjectSchema } from './UserCreateOrConnectWithoutAuthInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAuthInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutAuthInputObjectSchema = Schema;
