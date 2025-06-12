import { z } from 'zod';
import { ServerListOrderElementOrderByWithRelationInputObjectSchema } from './objects/ServerListOrderElementOrderByWithRelationInput.schema';
import { ServerListOrderElementWhereInputObjectSchema } from './objects/ServerListOrderElementWhereInput.schema';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementCountAggregateInputObjectSchema } from './objects/ServerListOrderElementCountAggregateInput.schema';
import { ServerListOrderElementMinAggregateInputObjectSchema } from './objects/ServerListOrderElementMinAggregateInput.schema';
import { ServerListOrderElementMaxAggregateInputObjectSchema } from './objects/ServerListOrderElementMaxAggregateInput.schema';
import { ServerListOrderElementAvgAggregateInputObjectSchema } from './objects/ServerListOrderElementAvgAggregateInput.schema';
import { ServerListOrderElementSumAggregateInputObjectSchema } from './objects/ServerListOrderElementSumAggregateInput.schema';

export const ServerListOrderElementAggregateSchema = z.object({
  orderBy: z
    .union([
      ServerListOrderElementOrderByWithRelationInputObjectSchema,
      ServerListOrderElementOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerListOrderElementWhereInputObjectSchema.optional(),
  cursor: ServerListOrderElementWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([
      z.literal(true),
      ServerListOrderElementCountAggregateInputObjectSchema,
    ])
    .optional(),
  _min: ServerListOrderElementMinAggregateInputObjectSchema.optional(),
  _max: ServerListOrderElementMaxAggregateInputObjectSchema.optional(),
  _avg: ServerListOrderElementAvgAggregateInputObjectSchema.optional(),
  _sum: ServerListOrderElementSumAggregateInputObjectSchema.optional(),
});
