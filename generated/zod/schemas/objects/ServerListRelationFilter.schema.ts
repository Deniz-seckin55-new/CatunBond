import { z } from 'zod';
import { ServerWhereInputObjectSchema } from './ServerWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListRelationFilter> = z
  .object({
    every: z.lazy(() => ServerWhereInputObjectSchema).optional(),
    some: z.lazy(() => ServerWhereInputObjectSchema).optional(),
    none: z.lazy(() => ServerWhereInputObjectSchema).optional(),
  })
  .strict();

export const ServerListRelationFilterObjectSchema = Schema;
