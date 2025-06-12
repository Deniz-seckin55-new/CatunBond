import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateManyInput> = z
  .object({
    id: z.string(),
    index: z.number(),
    userInfoUserId: z.string().optional().nullable(),
  })
  .strict();

export const ServerListOrderElementCreateManyInputObjectSchema = Schema;
