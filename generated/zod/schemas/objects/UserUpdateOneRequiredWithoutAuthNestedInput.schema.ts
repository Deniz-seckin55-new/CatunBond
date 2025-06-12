import { z } from 'zod';
import { UserCreateWithoutAuthInputObjectSchema } from './UserCreateWithoutAuthInput.schema';
import { UserUncheckedCreateWithoutAuthInputObjectSchema } from './UserUncheckedCreateWithoutAuthInput.schema';
import { UserCreateOrConnectWithoutAuthInputObjectSchema } from './UserCreateOrConnectWithoutAuthInput.schema';
import { UserUpsertWithoutAuthInputObjectSchema } from './UserUpsertWithoutAuthInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutAuthInputObjectSchema } from './UserUpdateWithoutAuthInput.schema';
import { UserUncheckedUpdateWithoutAuthInputObjectSchema } from './UserUncheckedUpdateWithoutAuthInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthNestedInput> = z
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
    upsert: z.lazy(() => UserUpsertWithoutAuthInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutAuthInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAuthInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutAuthNestedInputObjectSchema = Schema;
