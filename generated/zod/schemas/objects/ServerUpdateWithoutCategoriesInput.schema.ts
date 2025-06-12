import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ServerUpdateinvitesInputObjectSchema } from './ServerUpdateinvitesInput.schema';
import { UserUpdateManyWithoutServersNestedInputObjectSchema } from './UserUpdateManyWithoutServersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpdateWithoutCategoriesInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    iconUrl: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    ownerId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    invites: z
      .union([
        z.lazy(() => ServerUpdateinvitesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    members: z
      .lazy(() => UserUpdateManyWithoutServersNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerUpdateWithoutCategoriesInputObjectSchema = Schema;
