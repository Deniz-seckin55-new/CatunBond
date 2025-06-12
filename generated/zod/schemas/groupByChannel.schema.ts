import { z } from 'zod';
import { ChannelWhereInputObjectSchema } from './objects/ChannelWhereInput.schema';
import { ChannelOrderByWithAggregationInputObjectSchema } from './objects/ChannelOrderByWithAggregationInput.schema';
import { ChannelScalarWhereWithAggregatesInputObjectSchema } from './objects/ChannelScalarWhereWithAggregatesInput.schema';
import { ChannelScalarFieldEnumSchema } from './enums/ChannelScalarFieldEnum.schema';

export const ChannelGroupBySchema = z.object({
  where: ChannelWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ChannelOrderByWithAggregationInputObjectSchema,
      ChannelOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ChannelScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ChannelScalarFieldEnumSchema),
});
