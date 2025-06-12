import { z } from 'zod';
import { ServerOrderByWithRelationInputObjectSchema } from './objects/ServerOrderByWithRelationInput.schema';
import { ServerWhereInputObjectSchema } from './objects/ServerWhereInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';
import { ServerCountAggregateInputObjectSchema } from './objects/ServerCountAggregateInput.schema';
import { ServerMinAggregateInputObjectSchema } from './objects/ServerMinAggregateInput.schema';
import { ServerMaxAggregateInputObjectSchema } from './objects/ServerMaxAggregateInput.schema';

export const ServerAggregateSchema = z.object({
  orderBy: z
    .union([
      ServerOrderByWithRelationInputObjectSchema,
      ServerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerWhereInputObjectSchema.optional(),
  cursor: ServerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ServerCountAggregateInputObjectSchema])
    .optional(),
  _min: ServerMinAggregateInputObjectSchema.optional(),
  _max: ServerMaxAggregateInputObjectSchema.optional(),
});
