import { z } from 'zod';
import { ServerCreateinvitesInputObjectSchema } from './ServerCreateinvitesInput.schema';
import { CategoryUncheckedCreateNestedManyWithoutServerInputObjectSchema } from './CategoryUncheckedCreateNestedManyWithoutServerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUncheckedCreateWithoutMembersInput> = z
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
      .lazy(
        () => CategoryUncheckedCreateNestedManyWithoutServerInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ServerUncheckedCreateWithoutMembersInputObjectSchema = Schema;
