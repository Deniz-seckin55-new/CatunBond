import { z } from 'zod';
import { FriendRequestUpdateManyMutationInputObjectSchema } from './objects/FriendRequestUpdateManyMutationInput.schema';
import { FriendRequestWhereInputObjectSchema } from './objects/FriendRequestWhereInput.schema';

export const FriendRequestUpdateManySchema = z.object({
  data: FriendRequestUpdateManyMutationInputObjectSchema,
  where: FriendRequestWhereInputObjectSchema.optional(),
});
