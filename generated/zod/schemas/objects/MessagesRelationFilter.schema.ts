import { z } from 'zod';
import { MessagesWhereInputObjectSchema } from './MessagesWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesRelationFilter> = z
  .object({
    is: z
      .lazy(() => MessagesWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => MessagesWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const MessagesRelationFilterObjectSchema = Schema;
