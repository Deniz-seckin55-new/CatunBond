import { z } from 'zod';
import { CategoryCreateManyServerInputObjectSchema } from './CategoryCreateManyServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateManyServerInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CategoryCreateManyServerInputObjectSchema),
      z.lazy(() => CategoryCreateManyServerInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CategoryCreateManyServerInputEnvelopeObjectSchema = Schema;
