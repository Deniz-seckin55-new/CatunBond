import { z } from 'zod';
import { FriendRequestUpdateInputObjectSchema } from './objects/FriendRequestUpdateInput.schema';
import { FriendRequestUncheckedUpdateInputObjectSchema } from './objects/FriendRequestUncheckedUpdateInput.schema';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';

export const FriendRequestUpdateOneSchema = z.object({
  data: z.union([
    FriendRequestUpdateInputObjectSchema,
    FriendRequestUncheckedUpdateInputObjectSchema,
  ]),
  where: FriendRequestWhereUniqueInputObjectSchema,
});
