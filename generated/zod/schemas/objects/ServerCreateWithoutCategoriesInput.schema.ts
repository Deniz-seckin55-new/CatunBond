import { z } from 'zod';
import { ServerCreateinvitesInputObjectSchema } from './ServerCreateinvitesInput.schema';
import { UserCreateNestedManyWithoutServersInputObjectSchema } from './UserCreateNestedManyWithoutServersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCreateWithoutCategoriesInput> = z
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
      .lazy(() => UserCreateNestedManyWithoutServersInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerCreateWithoutCategoriesInputObjectSchema = Schema;
