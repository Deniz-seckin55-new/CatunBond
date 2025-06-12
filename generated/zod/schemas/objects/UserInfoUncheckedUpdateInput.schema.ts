import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ServerListOrderElementUncheckedUpdateManyWithoutUserInfoNestedInputObjectSchema } from './ServerListOrderElementUncheckedUpdateManyWithoutUserInfoNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoUncheckedUpdateInput> = z
  .object({
    userId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    biography: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    usernameColor: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    mainLink: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    shortDescription: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    serverListOrder: z
      .lazy(
        () =>
          ServerListOrderElementUncheckedUpdateManyWithoutUserInfoNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserInfoUncheckedUpdateInputObjectSchema = Schema;
