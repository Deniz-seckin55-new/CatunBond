import { z } from 'zod';
import { ServerListOrderElementWhereInputObjectSchema } from './ServerListOrderElementWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementListRelationFilter> = z
  .object({
    every: z
      .lazy(() => ServerListOrderElementWhereInputObjectSchema)
      .optional(),
    some: z.lazy(() => ServerListOrderElementWhereInputObjectSchema).optional(),
    none: z.lazy(() => ServerListOrderElementWhereInputObjectSchema).optional(),
  })
  .strict();

export const ServerListOrderElementListRelationFilterObjectSchema = Schema;
