import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MessagesCreatementionsInputObjectSchema } from './MessagesCreatementionsInput.schema';
import { UserCreateNestedOneWithoutMessagesInputObjectSchema } from './UserCreateNestedOneWithoutMessagesInput.schema';
import { ChannelCreateNestedOneWithoutMessagesInputObjectSchema } from './ChannelCreateNestedOneWithoutMessagesInput.schema';
import { MessagesCreateNestedOneWithoutRepliesInputObjectSchema } from './MessagesCreateNestedOneWithoutRepliesInput.schema';
import { ReactionCreateNestedManyWithoutMessageInputObjectSchema } from './ReactionCreateNestedManyWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.MessagesCreateWithoutRepliesInput> = z
  .object({
    id: z.string().optional(),
    content: z.string(),
    timestamp: z.coerce.date().optional(),
    attachments: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    mentions: z
      .union([
        z.lazy(() => MessagesCreatementionsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutMessagesInputObjectSchema),
    channel: z.lazy(
      () => ChannelCreateNestedOneWithoutMessagesInputObjectSchema,
    ),
    repliedTo: z
      .lazy(() => MessagesCreateNestedOneWithoutRepliesInputObjectSchema)
      .optional(),
    reactions: z
      .lazy(() => ReactionCreateNestedManyWithoutMessageInputObjectSchema)
      .optional(),
  })
  .strict();

export const MessagesCreateWithoutRepliesInputObjectSchema = Schema;
