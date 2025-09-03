import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUncheckedCreateInput> = z
  .object({
    id: z.string(),
    serverId: z.string(),
    index: z.number(),
    userInfoUserId: z.string().optional().nullable(),
  })
  .strict();

export const ServerListOrderElementUncheckedCreateInputObjectSchema = Schema;
