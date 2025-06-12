import { z } from 'zod';
import { ServerInfoCreaterulesInputObjectSchema } from './ServerInfoCreaterulesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerInfoCreateManyInput> = z
  .object({
    serverId: z.string(),
    name: z.string(),
    iconUrl: z.string(),
    maxUsers: z.number(),
    color: z.string(),
    description: z.string(),
    slogan: z.string().optional().nullable(),
    rules: z
      .union([
        z.lazy(() => ServerInfoCreaterulesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const ServerInfoCreateManyInputObjectSchema = Schema;
