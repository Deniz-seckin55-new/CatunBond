import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { CategoryListRelationFilterObjectSchema } from './CategoryListRelationFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ServerWhereInputObjectSchema),
        z.lazy(() => ServerWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ServerWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ServerWhereInputObjectSchema),
        z.lazy(() => ServerWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    iconUrl: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    ownerId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    invites: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    categories: z.lazy(() => CategoryListRelationFilterObjectSchema).optional(),
    members: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ServerWhereInputObjectSchema = Schema;
