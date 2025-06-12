import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';

export const FriendRequestDeleteOneSchema = z.object({
  where: FriendRequestWhereUniqueInputObjectSchema,
});
