import { z } from 'zod';
import { UserInfoCreateNestedOneWithoutServerListOrderInputObjectSchema } from './UserInfoCreateNestedOneWithoutServerListOrderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateInput> = z
  .object({
    id: z.string(),
    serverId: z.string(),
    index: z.number(),
    UserInfo: z
      .lazy(
        () => UserInfoCreateNestedOneWithoutServerListOrderInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ServerListOrderElementCreateInputObjectSchema = Schema;
