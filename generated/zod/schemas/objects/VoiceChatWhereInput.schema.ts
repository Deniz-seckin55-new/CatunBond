import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VoiceChatWhereInputObjectSchema),
        z.lazy(() => VoiceChatWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VoiceChatWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VoiceChatWhereInputObjectSchema),
        z.lazy(() => VoiceChatWhereInputObjectSchema).array(),
      ])
      .optional(),
    channelId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    serverId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    members: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const VoiceChatWhereInputObjectSchema = Schema;
