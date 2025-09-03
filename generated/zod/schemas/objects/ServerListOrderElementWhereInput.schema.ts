import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserInfoRelationFilterObjectSchema } from './UserInfoRelationFilter.schema';
import { UserInfoWhereInputObjectSchema } from './UserInfoWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ServerListOrderElementWhereInputObjectSchema),
        z.lazy(() => ServerListOrderElementWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ServerListOrderElementWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ServerListOrderElementWhereInputObjectSchema),
        z.lazy(() => ServerListOrderElementWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    serverId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    index: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    userInfoUserId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    UserInfo: z
      .union([
        z.lazy(() => UserInfoRelationFilterObjectSchema),
        z.lazy(() => UserInfoWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const ServerListOrderElementWhereInputObjectSchema = Schema;
