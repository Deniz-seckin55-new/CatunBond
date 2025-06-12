import { z } from 'zod';
import { FriendRequestOrderByWithRelationInputObjectSchema } from './objects/FriendRequestOrderByWithRelationInput.schema';
import { FriendRequestWhereInputObjectSchema } from './objects/FriendRequestWhereInput.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';
import { FriendRequestScalarFieldEnumSchema } from './enums/FriendRequestScalarFieldEnum.schema';

export const FriendRequestFindManySchema = z.object({
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
  distinct: z.array(FriendRequestScalarFieldEnumSchema).optional(),
});
