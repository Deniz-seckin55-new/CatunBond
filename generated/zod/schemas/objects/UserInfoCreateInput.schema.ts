import { z } from 'zod';
import { ServerListOrderElementCreateNestedManyWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateNestedManyWithoutUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoCreateInput> = z
  .object({
    userId: z.string(),
    biography: z.string(),
    usernameColor: z.string().optional(),
    mainLink: z.string(),
    shortDescription: z.string(),
    serverListOrder: z
      .lazy(
        () =>
          ServerListOrderElementCreateNestedManyWithoutUserInfoInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserInfoCreateInputObjectSchema = Schema;
