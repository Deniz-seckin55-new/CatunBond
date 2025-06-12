import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ServerInfoWhereInputObjectSchema),
        z.lazy(() => ServerInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ServerInfoWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ServerInfoWhereInputObjectSchema),
        z.lazy(() => ServerInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    serverId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    iconUrl: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    maxUsers: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    color: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slogan: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    rules: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  })
  .strict();

export const ServerInfoWhereInputObjectSchema = Schema;
