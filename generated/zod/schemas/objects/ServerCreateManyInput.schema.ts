import { z } from 'zod';
import { ServerCreateinvitesInputObjectSchema } from './ServerCreateinvitesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCreateManyInput> = z
  .object({
    id: z.string().optional(),
    iconUrl: z.string(),
    name: z.string(),
    ownerId: z.string(),
    invites: z
      .union([
        z.lazy(() => ServerCreateinvitesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const ServerCreateManyInputObjectSchema = Schema;
