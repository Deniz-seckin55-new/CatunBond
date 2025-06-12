import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MessagesCreatementionsInputObjectSchema } from './MessagesCreatementionsInput.schema';

import type { Prisma } from '@prisma/client';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ]),
);

const Schema: z.ZodType<Prisma.MessagesCreateManyChannelInput> = z
  .object({
    id: z.string().optional(),
    content: z.string(),
    timestamp: z.coerce.date().optional(),
    authorId: z.string(),
    repliedToId: z.string().optional().nullable(),
    attachments: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    mentions: z
      .union([
        z.lazy(() => MessagesCreatementionsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const MessagesCreateManyChannelInputObjectSchema = Schema;
