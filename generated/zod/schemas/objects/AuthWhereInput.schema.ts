import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AuthWhereInputObjectSchema),
        z.lazy(() => AuthWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AuthWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AuthWhereInputObjectSchema),
        z.lazy(() => AuthWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    password_hash: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    salt: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    id: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const AuthWhereInputObjectSchema = Schema;
