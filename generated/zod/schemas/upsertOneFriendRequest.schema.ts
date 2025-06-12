import { z } from 'zod';
import { FriendRequestWhereUniqueInputObjectSchema } from './objects/FriendRequestWhereUniqueInput.schema';
import { FriendRequestCreateInputObjectSchema } from './objects/FriendRequestCreateInput.schema';
import { FriendRequestUncheckedCreateInputObjectSchema } from './objects/FriendRequestUncheckedCreateInput.schema';
import { FriendRequestUpdateInputObjectSchema } from './objects/FriendRequestUpdateInput.schema';
import { FriendRequestUncheckedUpdateInputObjectSchema } from './objects/FriendRequestUncheckedUpdateInput.schema';

export const FriendRequestUpsertSchema = z.object({
  where: FriendRequestWhereUniqueInputObjectSchema,
  create: z.union([
    FriendRequestCreateInputObjectSchema,
    FriendRequestUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    FriendRequestUpdateInputObjectSchema,
    FriendRequestUncheckedUpdateInputObjectSchema,
  ]),
});
