import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ServerListOrderElementScalarWhereInputObjectSchema),
        z
          .lazy(() => ServerListOrderElementScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ServerListOrderElementScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ServerListOrderElementScalarWhereInputObjectSchema),
        z
          .lazy(() => ServerListOrderElementScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    index: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    userInfoUserId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const ServerListOrderElementScalarWhereInputObjectSchema = Schema;
