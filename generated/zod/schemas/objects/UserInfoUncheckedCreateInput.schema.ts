import { z } from 'zod';
import { ServerListOrderElementUncheckedCreateNestedManyWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedCreateNestedManyWithoutUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoUncheckedCreateInput> = z
  .object({
    userId: z.string(),
    biography: z.string(),
    usernameColor: z.string().optional(),
    mainLink: z.string(),
    shortDescription: z.string(),
    serverListOrder: z
      .lazy(
        () =>
          ServerListOrderElementUncheckedCreateNestedManyWithoutUserInfoInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserInfoUncheckedCreateInputObjectSchema = Schema;
