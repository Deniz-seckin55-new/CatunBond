import * as z from "zod"

import { FriendRequestStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const FriendRequestModel = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  status: z.nativeEnum(FriendRequestStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFriendRequest extends z.infer<typeof FriendRequestModel> {
  receiver: CompleteUser
  sender: CompleteUser
}

/**
 * RelatedFriendRequestModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFriendRequestModel: z.ZodSchema<CompleteFriendRequest> = z.lazy(() => FriendRequestModel.extend({
  receiver: RelatedUserModel,
  sender: RelatedUserModel,
}))
