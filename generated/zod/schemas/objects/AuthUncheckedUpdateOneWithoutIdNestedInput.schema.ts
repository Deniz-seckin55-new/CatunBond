import { z } from 'zod';
import { AuthCreateWithoutIdInputObjectSchema } from './AuthCreateWithoutIdInput.schema';
import { AuthUncheckedCreateWithoutIdInputObjectSchema } from './AuthUncheckedCreateWithoutIdInput.schema';
import { AuthCreateOrConnectWithoutIdInputObjectSchema } from './AuthCreateOrConnectWithoutIdInput.schema';
import { AuthUpsertWithoutIdInputObjectSchema } from './AuthUpsertWithoutIdInput.schema';
import { AuthWhereUniqueInputObjectSchema } from './AuthWhereUniqueInput.schema';
import { AuthUpdateWithoutIdInputObjectSchema } from './AuthUpdateWithoutIdInput.schema';
import { AuthUncheckedUpdateWithoutIdInputObjectSchema } from './AuthUncheckedUpdateWithoutIdInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthUncheckedUpdateOneWithoutIdNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => AuthCreateWithoutIdInputObjectSchema),
        z.lazy(() => AuthUncheckedCreateWithoutIdInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AuthCreateOrConnectWithoutIdInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => AuthUpsertWithoutIdInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => AuthWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => AuthUpdateWithoutIdInputObjectSchema),
        z.lazy(() => AuthUncheckedUpdateWithoutIdInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const AuthUncheckedUpdateOneWithoutIdNestedInputObjectSchema = Schema;
