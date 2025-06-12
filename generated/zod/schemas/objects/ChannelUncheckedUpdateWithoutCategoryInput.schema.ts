import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { EnumChannelTypeFieldUpdateOperationsInputObjectSchema } from './EnumChannelTypeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { MessagesUncheckedUpdateManyWithoutChannelNestedInputObjectSchema } from './MessagesUncheckedUpdateManyWithoutChannelNestedInput.schema';
import { UserUncheckedUpdateManyWithoutDirectMsgsNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutDirectMsgsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedUpdateWithoutCategoryInput> = z
  .object({
    id: z
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
    channelType: z
      .union([
        z.lazy(() => ChannelTypeSchema),
        z.lazy(() => EnumChannelTypeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    index: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    messages: z
      .lazy(
        () => MessagesUncheckedUpdateManyWithoutChannelNestedInputObjectSchema,
      )
      .optional(),
    directMsgFor: z
      .lazy(
        () => UserUncheckedUpdateManyWithoutDirectMsgsNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ChannelUncheckedUpdateWithoutCategoryInputObjectSchema = Schema;
