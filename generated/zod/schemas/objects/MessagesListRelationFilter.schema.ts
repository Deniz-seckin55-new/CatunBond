import { z } from 'zod';
import { MessagesWhereInputObjectSchema } from './MessagesWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesListRelationFilter> = z
  .object({
    every: z.lazy(() => MessagesWhereInputObjectSchema).optional(),
    some: z.lazy(() => MessagesWhereInputObjectSchema).optional(),
    none: z.lazy(() => MessagesWhereInputObjectSchema).optional(),
  })
  .strict();

export const MessagesListRelationFilterObjectSchema = Schema;
