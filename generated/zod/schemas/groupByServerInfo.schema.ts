import { z } from 'zod';
import { ServerInfoWhereInputObjectSchema } from './objects/ServerInfoWhereInput.schema';
import { ServerInfoOrderByWithAggregationInputObjectSchema } from './objects/ServerInfoOrderByWithAggregationInput.schema';
import { ServerInfoScalarWhereWithAggregatesInputObjectSchema } from './objects/ServerInfoScalarWhereWithAggregatesInput.schema';
import { ServerInfoScalarFieldEnumSchema } from './enums/ServerInfoScalarFieldEnum.schema';

export const ServerInfoGroupBySchema = z.object({
  where: ServerInfoWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ServerInfoOrderByWithAggregationInputObjectSchema,
      ServerInfoOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ServerInfoScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ServerInfoScalarFieldEnumSchema),
});
