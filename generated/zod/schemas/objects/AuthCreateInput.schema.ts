import { z } from 'zod';
import { UserCreateNestedOneWithoutAuthInputObjectSchema } from './UserCreateNestedOneWithoutAuthInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthCreateInput> = z
  .object({
    password_hash: z.string(),
    salt: z.string(),
    id: z.lazy(() => UserCreateNestedOneWithoutAuthInputObjectSchema),
  })
  .strict();

export const AuthCreateInputObjectSchema = Schema;
