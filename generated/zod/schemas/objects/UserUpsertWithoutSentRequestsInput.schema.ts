import { z } from 'zod';
import { UserUpdateWithoutSentRequestsInputObjectSchema } from './UserUpdateWithoutSentRequestsInput.schema';
import { UserUncheckedUpdateWithoutSentRequestsInputObjectSchema } from './UserUncheckedUpdateWithoutSentRequestsInput.schema';
import { UserCreateWithoutSentRequestsInputObjectSchema } from './UserCreateWithoutSentRequestsInput.schema';
import { UserUncheckedCreateWithoutSentRequestsInputObjectSchema } from './UserUncheckedCreateWithoutSentRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutSentRequestsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSentRequestsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSentRequestsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSentRequestsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutSentRequestsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutSentRequestsInputObjectSchema = Schema;
