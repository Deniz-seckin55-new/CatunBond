import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ServerUpdateinvitesInputObjectSchema } from './ServerUpdateinvitesInput.schema';
import { CategoryUncheckedUpdateManyWithoutServerNestedInputObjectSchema } from './CategoryUncheckedUpdateManyWithoutServerNestedInput.schema';
import { UserUncheckedUpdateManyWithoutServersNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutServersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUncheckedUpdateInput> = z
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
    categories: z
      .lazy(
        () => CategoryUncheckedUpdateManyWithoutServerNestedInputObjectSchema,
      )
      .optional(),
    members: z
      .lazy(() => UserUncheckedUpdateManyWithoutServersNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const ServerUncheckedUpdateInputObjectSchema = Schema;
