import { z } from 'zod';
import { ReactionWhereInputObjectSchema } from './objects/ReactionWhereInput.schema';
import { ReactionOrderByWithAggregationInputObjectSchema } from './objects/ReactionOrderByWithAggregationInput.schema';
import { ReactionScalarWhereWithAggregatesInputObjectSchema } from './objects/ReactionScalarWhereWithAggregatesInput.schema';
import { ReactionScalarFieldEnumSchema } from './enums/ReactionScalarFieldEnum.schema';

export const ReactionGroupBySchema = z.object({
  where: ReactionWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ReactionOrderByWithAggregationInputObjectSchema,
      ReactionOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ReactionScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ReactionScalarFieldEnumSchema),
});
