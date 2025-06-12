import { z } from 'zod';
import { FriendRequestWhereInputObjectSchema } from './objects/FriendRequestWhereInput.schema';

export const FriendRequestDeleteManySchema = z.object({
  where: FriendRequestWhereInputObjectSchema.optional(),
});
