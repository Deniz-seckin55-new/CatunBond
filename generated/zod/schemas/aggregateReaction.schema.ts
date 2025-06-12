import { z } from 'zod';
import { ReactionOrderByWithRelationInputObjectSchema } from './objects/ReactionOrderByWithRelationInput.schema';
import { ReactionWhereInputObjectSchema } from './objects/ReactionWhereInput.schema';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';
import { ReactionCountAggregateInputObjectSchema } from './objects/ReactionCountAggregateInput.schema';
import { ReactionMinAggregateInputObjectSchema } from './objects/ReactionMinAggregateInput.schema';
import { ReactionMaxAggregateInputObjectSchema } from './objects/ReactionMaxAggregateInput.schema';

export const ReactionAggregateSchema = z.object({
  orderBy: z
    .union([
      ReactionOrderByWithRelationInputObjectSchema,
      ReactionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ReactionWhereInputObjectSchema.optional(),
  cursor: ReactionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ReactionCountAggregateInputObjectSchema])
    .optional(),
  _min: ReactionMinAggregateInputObjectSchema.optional(),
  _max: ReactionMaxAggregateInputObjectSchema.optional(),
});
