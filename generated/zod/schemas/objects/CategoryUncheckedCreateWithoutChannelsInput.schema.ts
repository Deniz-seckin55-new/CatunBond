import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutChannelsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    serverId: z.string(),
    index: z.number().optional(),
  })
  .strict();

export const CategoryUncheckedCreateWithoutChannelsInputObjectSchema = Schema;
