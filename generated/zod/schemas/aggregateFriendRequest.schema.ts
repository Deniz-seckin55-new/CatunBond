import { z } from 'zod';
import { FriendRequestOrderByWithRelationInputObjectSchema } from './objects/FriendRequestOrderByWithRelationInput.schema';
import { FriendRequestWhereInputObjectSchema } from './objects/FriendRequestWhereInput.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';
import { FriendRequestCountAggregateInputObjectSchema } from './objects/FriendRequestCountAggregateInput.schema';
import { FriendRequestMinAggregateInputObjectSchema } from './objects/FriendRequestMinAggregateInput.schema';
import { FriendRequestMaxAggregateInputObjectSchema } from './objects/FriendRequestMaxAggregateInput.schema';

export const FriendRequestAggregateSchema = z.object({
  orderBy: z
    .union([
      FriendRequestOrderByWithRelationInputObjectSchema,
      FriendRequestOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: FriendRequestWhereInputObjectSchema.optional(),
  cursor: FriendRequestWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), FriendRequestCountAggregateInputObjectSchema])
    .optional(),
  _min: FriendRequestMinAggregateInputObjectSchema.optional(),
  _max: FriendRequestMaxAggregateInputObjectSchema.optional(),
});
