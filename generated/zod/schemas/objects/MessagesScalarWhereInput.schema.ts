import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MessagesScalarWhereInputObjectSchema),
        z.lazy(() => MessagesScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MessagesScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MessagesScalarWhereInputObjectSchema),
        z.lazy(() => MessagesScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    timestamp: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    repliedToId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    attachments: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    mentions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  })
  .strict();

export const MessagesScalarWhereInputObjectSchema = Schema;
