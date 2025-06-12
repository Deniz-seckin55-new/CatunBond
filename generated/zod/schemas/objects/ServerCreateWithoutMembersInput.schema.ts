import { z } from 'zod';
import { ServerCreateinvitesInputObjectSchema } from './ServerCreateinvitesInput.schema';
import { CategoryCreateNestedManyWithoutServerInputObjectSchema } from './CategoryCreateNestedManyWithoutServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCreateWithoutMembersInput> = z
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
    categories: z
      .lazy(() => CategoryCreateNestedManyWithoutServerInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerCreateWithoutMembersInputObjectSchema = Schema;
