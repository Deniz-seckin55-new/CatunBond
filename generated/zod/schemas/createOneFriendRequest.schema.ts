import { z } from 'zod';
import { FriendRequestCreateInputObjectSchema } from './objects/FriendRequestCreateInput.schema';
import { FriendRequestUncheckedCreateInputObjectSchema } from './objects/FriendRequestUncheckedCreateInput.schema';

export const FriendRequestCreateOneSchema = z.object({
  data: z.union([
    FriendRequestCreateInputObjectSchema,
    FriendRequestUncheckedCreateInputObjectSchema,
  ]),
});
