import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ServerListOrderElementListRelationFilterObjectSchema } from './ServerListOrderElementListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInfoWhereInputObjectSchema),
        z.lazy(() => UserInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInfoWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInfoWhereInputObjectSchema),
        z.lazy(() => UserInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    biography: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    usernameColor: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    mainLink: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    shortDescription: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    serverListOrder: z
      .lazy(() => ServerListOrderElementListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();

export const UserInfoWhereInputObjectSchema = Schema;
