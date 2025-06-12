import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MessagesUpdatementionsInputObjectSchema } from './MessagesUpdatementionsInput.schema';
import { ChannelUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from './ChannelUpdateOneRequiredWithoutMessagesNestedInput.schema';
import { MessagesUpdateOneWithoutRepliesNestedInputObjectSchema } from './MessagesUpdateOneWithoutRepliesNestedInput.schema';
import { MessagesUpdateManyWithoutRepliedToNestedInputObjectSchema } from './MessagesUpdateManyWithoutRepliedToNestedInput.schema';
import { ReactionUpdateManyWithoutMessageNestedInputObjectSchema } from './ReactionUpdateManyWithoutMessageNestedInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.MessagesUpdateWithoutAuthorInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    content: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    timestamp: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    attachments: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    mentions: z
      .union([
        z.lazy(() => MessagesUpdatementionsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    channel: z
      .lazy(
        () => ChannelUpdateOneRequiredWithoutMessagesNestedInputObjectSchema,
      )
      .optional(),
    repliedTo: z
      .lazy(() => MessagesUpdateOneWithoutRepliesNestedInputObjectSchema)
      .optional(),
    replies: z
      .lazy(() => MessagesUpdateManyWithoutRepliedToNestedInputObjectSchema)
      .optional(),
    reactions: z
      .lazy(() => ReactionUpdateManyWithoutMessageNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const MessagesUpdateWithoutAuthorInputObjectSchema = Schema;
