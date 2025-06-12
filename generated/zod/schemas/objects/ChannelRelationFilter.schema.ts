import { z } from 'zod';
import { ChannelWhereInputObjectSchema } from './ChannelWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelRelationFilter> = z
  .object({
    is: z
      .lazy(() => ChannelWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ChannelWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ChannelRelationFilterObjectSchema = Schema;
