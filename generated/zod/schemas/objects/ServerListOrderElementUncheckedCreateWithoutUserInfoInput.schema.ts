import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUncheckedCreateWithoutUserInfoInput> =
  z
    .object({
      id: z.string(),
      serverId: z.string(),
      index: z.number(),
    })
    .strict();

export const ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema =
  Schema;
