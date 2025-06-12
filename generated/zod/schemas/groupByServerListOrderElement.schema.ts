import { z } from 'zod';
import { ServerListOrderElementWhereInputObjectSchema } from './objects/ServerListOrderElementWhereInput.schema';
import { ServerListOrderElementOrderByWithAggregationInputObjectSchema } from './objects/ServerListOrderElementOrderByWithAggregationInput.schema';
import { ServerListOrderElementScalarWhereWithAggregatesInputObjectSchema } from './objects/ServerListOrderElementScalarWhereWithAggregatesInput.schema';
import { ServerListOrderElementScalarFieldEnumSchema } from './enums/ServerListOrderElementScalarFieldEnum.schema';

export const ServerListOrderElementGroupBySchema = z.object({
  where: ServerListOrderElementWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ServerListOrderElementOrderByWithAggregationInputObjectSchema,
      ServerListOrderElementOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having:
    ServerListOrderElementScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ServerListOrderElementScalarFieldEnumSchema),
});
