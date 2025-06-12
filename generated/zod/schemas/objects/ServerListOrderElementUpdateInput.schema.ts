import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { UserInfoUpdateOneWithoutServerListOrderNestedInputObjectSchema } from './UserInfoUpdateOneWithoutServerListOrderNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUpdateInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    index: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    UserInfo: z
      .lazy(
        () => UserInfoUpdateOneWithoutServerListOrderNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ServerListOrderElementUpdateInputObjectSchema = Schema;
