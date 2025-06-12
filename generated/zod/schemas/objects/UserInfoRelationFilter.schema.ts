import { z } from 'zod';
import { UserInfoWhereInputObjectSchema } from './UserInfoWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoRelationFilter> = z
  .object({
    is: z
      .lazy(() => UserInfoWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UserInfoWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const UserInfoRelationFilterObjectSchema = Schema;
