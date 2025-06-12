import { z } from 'zod';
import { UserCreateWithoutSentRequestsInputObjectSchema } from './UserCreateWithoutSentRequestsInput.schema';
import { UserUncheckedCreateWithoutSentRequestsInputObjectSchema } from './UserUncheckedCreateWithoutSentRequestsInput.schema';
import { UserCreateOrConnectWithoutSentRequestsInputObjectSchema } from './UserCreateOrConnectWithoutSentRequestsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutSentRequestsInput> = z
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
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutSentRequestsInputObjectSchema = Schema;
