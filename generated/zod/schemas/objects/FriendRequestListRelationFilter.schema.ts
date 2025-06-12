import { z } from 'zod';
import { FriendRequestWhereInputObjectSchema } from './FriendRequestWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FriendRequestListRelationFilter> = z
  .object({
    every: z.lazy(() => FriendRequestWhereInputObjectSchema).optional(),
    some: z.lazy(() => FriendRequestWhereInputObjectSchema).optional(),
    none: z.lazy(() => FriendRequestWhereInputObjectSchema).optional(),
  })
  .strict();

export const FriendRequestListRelationFilterObjectSchema = Schema;
