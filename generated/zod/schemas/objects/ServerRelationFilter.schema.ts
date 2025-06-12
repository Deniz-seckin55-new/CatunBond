import { z } from 'zod';
import { ServerWhereInputObjectSchema } from './ServerWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerRelationFilter> = z
  .object({
    is: z
      .lazy(() => ServerWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ServerWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ServerRelationFilterObjectSchema = Schema;
