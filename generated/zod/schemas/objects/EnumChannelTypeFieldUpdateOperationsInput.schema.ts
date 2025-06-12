import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumChannelTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => ChannelTypeSchema).optional(),
  })
  .strict();

export const EnumChannelTypeFieldUpdateOperationsInputObjectSchema = Schema;
