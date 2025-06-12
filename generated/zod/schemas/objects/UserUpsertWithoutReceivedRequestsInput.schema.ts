import { z } from 'zod';
import { UserUpdateWithoutReceivedRequestsInputObjectSchema } from './UserUpdateWithoutReceivedRequestsInput.schema';
import { UserUncheckedUpdateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedUpdateWithoutReceivedRequestsInput.schema';
import { UserCreateWithoutReceivedRequestsInputObjectSchema } from './UserCreateWithoutReceivedRequestsInput.schema';
import { UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema } from './UserUncheckedCreateWithoutReceivedRequestsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutReceivedRequestsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutReceivedRequestsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutReceivedRequestsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutReceivedRequestsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutReceivedRequestsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutReceivedRequestsInputObjectSchema = Schema;
