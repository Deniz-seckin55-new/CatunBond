import { z } from 'zod';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMutedInTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => MutedInTypeSchema).optional(),
  })
  .strict();

export const EnumMutedInTypeFieldUpdateOperationsInputObjectSchema = Schema;
