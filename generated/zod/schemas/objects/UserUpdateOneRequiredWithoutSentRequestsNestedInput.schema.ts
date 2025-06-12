import { z } from 'zod';
import { UserCreateWithoutSentRequestsInputObjectSchema } from './UserCreateWithoutSentRequestsInput.schema';
import { UserUncheckedCreateWithoutSentRequestsInputObjectSchema } from './UserUncheckedCreateWithoutSentRequestsInput.schema';
import { UserCreateOrConnectWithoutSentRequestsInputObjectSchema } from './UserCreateOrConnectWithoutSentRequestsInput.schema';
import { UserUpsertWithoutSentRequestsInputObjectSchema } from './UserUpsertWithoutSentRequestsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutSentRequestsInputObjectSchema } from './UserUpdateWithoutSentRequestsInput.schema';
import { UserUncheckedUpdateWithoutSentRequestsInputObjectSchema } from './UserUncheckedUpdateWithoutSentRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSentRequestsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSentRequestsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutSentRequestsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSentRequestsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutSentRequestsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutSentRequestsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSentRequestsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSentRequestsNestedInputObjectSchema =
  Schema;
