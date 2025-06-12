import { z } from 'zod';
import { ServerCreateinvitesInputObjectSchema } from './ServerCreateinvitesInput.schema';
import { UserUncheckedCreateNestedManyWithoutServersInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutServersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUncheckedCreateWithoutCategoriesInput> = z
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
    members: z
      .lazy(() => UserUncheckedCreateNestedManyWithoutServersInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerUncheckedCreateWithoutCategoriesInputObjectSchema = Schema;
