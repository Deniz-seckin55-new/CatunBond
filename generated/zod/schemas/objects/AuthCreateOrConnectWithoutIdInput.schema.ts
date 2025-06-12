import { z } from 'zod';
import { AuthWhereUniqueInputObjectSchema } from './AuthWhereUniqueInput.schema';
import { AuthCreateWithoutIdInputObjectSchema } from './AuthCreateWithoutIdInput.schema';
import { AuthUncheckedCreateWithoutIdInputObjectSchema } from './AuthUncheckedCreateWithoutIdInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthCreateOrConnectWithoutIdInput> = z
  .object({
    where: z.lazy(() => AuthWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => AuthCreateWithoutIdInputObjectSchema),
      z.lazy(() => AuthUncheckedCreateWithoutIdInputObjectSchema),
    ]),
  })
  .strict();

export const AuthCreateOrConnectWithoutIdInputObjectSchema = Schema;
