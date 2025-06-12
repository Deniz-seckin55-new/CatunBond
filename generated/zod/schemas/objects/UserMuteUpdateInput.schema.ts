import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MutedInTypeSchema } from '../enums/MutedInType.schema';
import { EnumMutedInTypeFieldUpdateOperationsInputObjectSchema } from './EnumMutedInTypeFieldUpdateOperationsInput.schema';
import { MuteTypeSchema } from '../enums/MuteType.schema';
import { EnumMuteTypeFieldUpdateOperationsInputObjectSchema } from './EnumMuteTypeFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMuteUpdateInput> = z
  .object({
    userId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    startedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    endsAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    mutedIn: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    mutedInType: z
      .union([
        z.lazy(() => MutedInTypeSchema),
        z.lazy(() => EnumMutedInTypeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    muteType: z
      .union([
        z.lazy(() => MuteTypeSchema),
        z.lazy(() => EnumMuteTypeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserMuteUpdateInputObjectSchema = Schema;
