import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAuthNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAuthNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthUpdateInput> = z
  .object({
    password_hash: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    salt: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    id: z
      .lazy(() => UserUpdateOneRequiredWithoutAuthNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const AuthUpdateInputObjectSchema = Schema;
