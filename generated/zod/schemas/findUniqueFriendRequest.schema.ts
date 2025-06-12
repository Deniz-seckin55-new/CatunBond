import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';

export const FriendRequestFindUniqueSchema = z.object({
  where: FriendRequestWhereUniqueInputObjectSchema,
});
