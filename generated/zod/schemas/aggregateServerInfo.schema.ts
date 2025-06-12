import { z } from 'zod';
import { ServerInfoOrderByWithRelationInputObjectSchema } from './objects/ServerInfoOrderByWithRelationInput.schema';
import { ServerInfoWhereInputObjectSchema } from './objects/ServerInfoWhereInput.schema';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';
import { ServerInfoCountAggregateInputObjectSchema } from './objects/ServerInfoCountAggregateInput.schema';
import { ServerInfoMinAggregateInputObjectSchema } from './objects/ServerInfoMinAggregateInput.schema';
import { ServerInfoMaxAggregateInputObjectSchema } from './objects/ServerInfoMaxAggregateInput.schema';
import { ServerInfoAvgAggregateInputObjectSchema } from './objects/ServerInfoAvgAggregateInput.schema';
import { ServerInfoSumAggregateInputObjectSchema } from './objects/ServerInfoSumAggregateInput.schema';

export const ServerInfoAggregateSchema = z.object({
  orderBy: z
    .union([
      ServerInfoOrderByWithRelationInputObjectSchema,
      ServerInfoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerInfoWhereInputObjectSchema.optional(),
  cursor: ServerInfoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ServerInfoCountAggregateInputObjectSchema])
    .optional(),
  _min: ServerInfoMinAggregateInputObjectSchema.optional(),
  _max: ServerInfoMaxAggregateInputObjectSchema.optional(),
  _avg: ServerInfoAvgAggregateInputObjectSchema.optional(),
  _sum: ServerInfoSumAggregateInputObjectSchema.optional(),
});
