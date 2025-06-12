import { z } from 'zod';
import { AuthCreateWithoutIdInputObjectSchema } from './AuthCreateWithoutIdInput.schema';
import { AuthUncheckedCreateWithoutIdInputObjectSchema } from './AuthUncheckedCreateWithoutIdInput.schema';
import { AuthCreateOrConnectWithoutIdInputObjectSchema } from './AuthCreateOrConnectWithoutIdInput.schema';
import { AuthWhereUniqueInputObjectSchema } from './AuthWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthCreateNestedOneWithoutIdInput> = z
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
    connect: z.lazy(() => AuthWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const AuthCreateNestedOneWithoutIdInputObjectSchema = Schema;
