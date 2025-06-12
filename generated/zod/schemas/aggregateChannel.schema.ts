import { z } from 'zod';
import { ChannelOrderByWithRelationInputObjectSchema } from './objects/ChannelOrderByWithRelationInput.schema';
import { ChannelWhereInputObjectSchema } from './objects/ChannelWhereInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './objects/ChannelWhereUniqueInput.schema';
import { ChannelCountAggregateInputObjectSchema } from './objects/ChannelCountAggregateInput.schema';
import { ChannelMinAggregateInputObjectSchema } from './objects/ChannelMinAggregateInput.schema';
import { ChannelMaxAggregateInputObjectSchema } from './objects/ChannelMaxAggregateInput.schema';
import { ChannelAvgAggregateInputObjectSchema } from './objects/ChannelAvgAggregateInput.schema';
import { ChannelSumAggregateInputObjectSchema } from './objects/ChannelSumAggregateInput.schema';

export const ChannelAggregateSchema = z.object({
  orderBy: z
    .union([
      ChannelOrderByWithRelationInputObjectSchema,
      ChannelOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ChannelWhereInputObjectSchema.optional(),
  cursor: ChannelWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ChannelCountAggregateInputObjectSchema])
    .optional(),
  _min: ChannelMinAggregateInputObjectSchema.optional(),
  _max: ChannelMaxAggregateInputObjectSchema.optional(),
  _avg: ChannelAvgAggregateInputObjectSchema.optional(),
  _sum: ChannelSumAggregateInputObjectSchema.optional(),
});
