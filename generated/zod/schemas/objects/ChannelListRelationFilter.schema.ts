import { z } from 'zod';
import { ChannelWhereInputObjectSchema } from './ChannelWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelListRelationFilter> = z
  .object({
    every: z.lazy(() => ChannelWhereInputObjectSchema).optional(),
    some: z.lazy(() => ChannelWhereInputObjectSchema).optional(),
    none: z.lazy(() => ChannelWhereInputObjectSchema).optional(),
  })
  .strict();

export const ChannelListRelationFilterObjectSchema = Schema;
