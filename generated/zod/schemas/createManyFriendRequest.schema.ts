import { z } from 'zod';
import { FriendRequestCreateManyInputObjectSchema } from './objects/FriendRequestCreateManyInput.schema';

export const FriendRequestCreateManySchema = z.object({
  data: z.union([
    FriendRequestCreateManyInputObjectSchema,
    z.array(FriendRequestCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
