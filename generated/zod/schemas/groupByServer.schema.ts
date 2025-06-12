import { z } from 'zod';
import { ServerWhereInputObjectSchema } from './objects/ServerWhereInput.schema';
import { ServerOrderByWithAggregationInputObjectSchema } from './objects/ServerOrderByWithAggregationInput.schema';
import { ServerScalarWhereWithAggregatesInputObjectSchema } from './objects/ServerScalarWhereWithAggregatesInput.schema';
import { ServerScalarFieldEnumSchema } from './enums/ServerScalarFieldEnum.schema';

export const ServerGroupBySchema = z.object({
  where: ServerWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ServerOrderByWithAggregationInputObjectSchema,
      ServerOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ServerScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ServerScalarFieldEnumSchema),
});
