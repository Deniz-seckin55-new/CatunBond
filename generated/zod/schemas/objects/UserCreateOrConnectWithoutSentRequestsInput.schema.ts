import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutSentRequestsInputObjectSchema } from './UserCreateWithoutSentRequestsInput.schema';
import { UserUncheckedCreateWithoutSentRequestsInputObjectSchema } from './UserUncheckedCreateWithoutSentRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutSentRequestsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutSentRequestsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutSentRequestsInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutSentRequestsInputObjectSchema = Schema;
