import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateWithoutUserInfoInput> =
  z
    .object({
      id: z.string(),
      index: z.number(),
    })
    .strict();

export const ServerListOrderElementCreateWithoutUserInfoInputObjectSchema =
  Schema;
