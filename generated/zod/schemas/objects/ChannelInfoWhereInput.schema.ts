import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumChannelTypeFilterObjectSchema } from './EnumChannelTypeFilter.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelInfoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelInfoWhereInputObjectSchema),
        z.lazy(() => ChannelInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelInfoWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelInfoWhereInputObjectSchema),
        z.lazy(() => ChannelInfoWhereInputObjectSchema).array(),
      ])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    type: z
      .union([
        z.lazy(() => EnumChannelTypeFilterObjectSchema),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slowMode: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    readOnly: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    nsfw: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    pinnedMessages: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
  })
  .strict();

export const ChannelInfoWhereInputObjectSchema = Schema;
