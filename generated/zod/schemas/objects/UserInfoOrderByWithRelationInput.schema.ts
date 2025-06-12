import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServerListOrderElementOrderByRelationAggregateInputObjectSchema } from './ServerListOrderElementOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInfoOrderByWithRelationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    biography: z.lazy(() => SortOrderSchema).optional(),
    usernameColor: z.lazy(() => SortOrderSchema).optional(),
    mainLink: z.lazy(() => SortOrderSchema).optional(),
    shortDescription: z.lazy(() => SortOrderSchema).optional(),
    serverListOrder: z
      .lazy(
        () => ServerListOrderElementOrderByRelationAggregateInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserInfoOrderByWithRelationInputObjectSchema = Schema;
