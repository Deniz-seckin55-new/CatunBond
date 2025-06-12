import { z } from 'zod';
import { MuteTypeSchema } from '../enums/MuteType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumMuteTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => MuteTypeSchema).optional(),
  })
  .strict();

export const EnumMuteTypeFieldUpdateOperationsInputObjectSchema = Schema;
