import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserInfoOrderByWithRelationInputObjectSchema } from './UserInfoOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      index: z.lazy(() => SortOrderSchema).optional(),
      userInfoUserId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputObjectSchema),
        ])
        .optional(),
      UserInfo: z
        .lazy(() => UserInfoOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();

export const ServerListOrderElementOrderByWithRelationInputObjectSchema =
  Schema;
