import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumChannelTypeFilterObjectSchema } from './EnumChannelTypeFilter.schema';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { CategoryRelationFilterObjectSchema } from './CategoryRelationFilter.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { MessagesListRelationFilterObjectSchema } from './MessagesListRelationFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelWhereInputObjectSchema),
        z.lazy(() => ChannelWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelWhereInputObjectSchema),
        z.lazy(() => ChannelWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    channelType: z
      .union([
        z.lazy(() => EnumChannelTypeFilterObjectSchema),
        z.lazy(() => ChannelTypeSchema),
      ])
      .optional(),
    categoryId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    index: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    category: z
      .union([
        z.lazy(() => CategoryRelationFilterObjectSchema),
        z.lazy(() => CategoryWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    messages: z.lazy(() => MessagesListRelationFilterObjectSchema).optional(),
    directMsgFor: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ChannelWhereInputObjectSchema = Schema;
