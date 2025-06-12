import { z } from 'zod';
import { ChannelInfoOrderByWithRelationInputObjectSchema } from './objects/ChannelInfoOrderByWithRelationInput.schema';
import { ChannelInfoWhereInputObjectSchema } from './objects/ChannelInfoWhereInput.schema';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';
import { ChannelInfoCountAggregateInputObjectSchema } from './objects/ChannelInfoCountAggregateInput.schema';
import { ChannelInfoMinAggregateInputObjectSchema } from './objects/ChannelInfoMinAggregateInput.schema';
import { ChannelInfoMaxAggregateInputObjectSchema } from './objects/ChannelInfoMaxAggregateInput.schema';
import { ChannelInfoAvgAggregateInputObjectSchema } from './objects/ChannelInfoAvgAggregateInput.schema';
import { ChannelInfoSumAggregateInputObjectSchema } from './objects/ChannelInfoSumAggregateInput.schema';

export const ChannelInfoAggregateSchema = z.object({
  orderBy: z
    .union([
      ChannelInfoOrderByWithRelationInputObjectSchema,
      ChannelInfoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ChannelInfoWhereInputObjectSchema.optional(),
  cursor: ChannelInfoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ChannelInfoCountAggregateInputObjectSchema])
    .optional(),
  _min: ChannelInfoMinAggregateInputObjectSchema.optional(),
  _max: ChannelInfoMaxAggregateInputObjectSchema.optional(),
  _avg: ChannelInfoAvgAggregateInputObjectSchema.optional(),
  _sum: ChannelInfoSumAggregateInputObjectSchema.optional(),
});
