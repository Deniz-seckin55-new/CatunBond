import { z } from 'zod';
import { AuthWhereInputObjectSchema } from './AuthWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthRelationFilter> = z
  .object({
    is: z
      .lazy(() => AuthWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => AuthWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const AuthRelationFilterObjectSchema = Schema;
