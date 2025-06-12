import { z } from 'zod';
import { ChannelInfoWhereInputObjectSchema } from './objects/ChannelInfoWhereInput.schema';
import { ChannelInfoOrderByWithAggregationInputObjectSchema } from './objects/ChannelInfoOrderByWithAggregationInput.schema';
import { ChannelInfoScalarWhereWithAggregatesInputObjectSchema } from './objects/ChannelInfoScalarWhereWithAggregatesInput.schema';
import { ChannelInfoScalarFieldEnumSchema } from './enums/ChannelInfoScalarFieldEnum.schema';

export const ChannelInfoGroupBySchema = z.object({
  where: ChannelInfoWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ChannelInfoOrderByWithAggregationInputObjectSchema,
      ChannelInfoOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ChannelInfoScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ChannelInfoScalarFieldEnumSchema),
});
