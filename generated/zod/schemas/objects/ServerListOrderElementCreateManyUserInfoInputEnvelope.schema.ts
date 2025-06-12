import { z } from 'zod';
import { ServerListOrderElementCreateManyUserInfoInputObjectSchema } from './ServerListOrderElementCreateManyUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateManyUserInfoInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ServerListOrderElementCreateManyUserInfoInputObjectSchema),
        z
          .lazy(() => ServerListOrderElementCreateManyUserInfoInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ServerListOrderElementCreateManyUserInfoInputEnvelopeObjectSchema =
  Schema;
