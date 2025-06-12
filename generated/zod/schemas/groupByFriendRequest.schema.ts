import { z } from 'zod';
import { FriendRequestWhereInputObjectSchema } from './objects/FriendRequestWhereInput.schema';
import { FriendRequestOrderByWithAggregationInputObjectSchema } from './objects/FriendRequestOrderByWithAggregationInput.schema';
import { FriendRequestScalarWhereWithAggregatesInputObjectSchema } from './objects/FriendRequestScalarWhereWithAggregatesInput.schema';
import { FriendRequestScalarFieldEnumSchema } from './enums/FriendRequestScalarFieldEnum.schema';

export const FriendRequestGroupBySchema = z.object({
  where: FriendRequestWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      FriendRequestOrderByWithAggregationInputObjectSchema,
      FriendRequestOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: FriendRequestScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(FriendRequestScalarFieldEnumSchema),
});
