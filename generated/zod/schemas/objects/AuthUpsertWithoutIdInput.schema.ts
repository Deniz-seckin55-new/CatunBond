import { z } from 'zod';
import { AuthUpdateWithoutIdInputObjectSchema } from './AuthUpdateWithoutIdInput.schema';
import { AuthUncheckedUpdateWithoutIdInputObjectSchema } from './AuthUncheckedUpdateWithoutIdInput.schema';
import { AuthCreateWithoutIdInputObjectSchema } from './AuthCreateWithoutIdInput.schema';
import { AuthUncheckedCreateWithoutIdInputObjectSchema } from './AuthUncheckedCreateWithoutIdInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthUpsertWithoutIdInput> = z
  .object({
    update: z.union([
      z.lazy(() => AuthUpdateWithoutIdInputObjectSchema),
      z.lazy(() => AuthUncheckedUpdateWithoutIdInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => AuthCreateWithoutIdInputObjectSchema),
      z.lazy(() => AuthUncheckedCreateWithoutIdInputObjectSchema),
    ]),
  })
  .strict();

export const AuthUpsertWithoutIdInputObjectSchema = Schema;
