import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MessagesUpdatementionsInputObjectSchema } from './MessagesUpdatementionsInput.schema';
import { MessagesUncheckedUpdateManyWithoutRepliedToNestedInputObjectSchema } from './MessagesUncheckedUpdateManyWithoutRepliedToNestedInput.schema';
import { ReactionUncheckedUpdateManyWithoutMessageNestedInputObjectSchema } from './ReactionUncheckedUpdateManyWithoutMessageNestedInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.MessagesUncheckedUpdateWithoutRepliedToInput> = z
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
    authorId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    channelId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
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
    replies: z
      .lazy(
        () =>
          MessagesUncheckedUpdateManyWithoutRepliedToNestedInputObjectSchema,
      )
      .optional(),
    reactions: z
      .lazy(
        () => ReactionUncheckedUpdateManyWithoutMessageNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const MessagesUncheckedUpdateWithoutRepliedToInputObjectSchema = Schema;
