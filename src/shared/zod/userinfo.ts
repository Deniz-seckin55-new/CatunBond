import * as z from "zod"

import { CompleteServerListOrderElement, RelatedServerListOrderElementModel } from "./index"

export const UserInfoModel = z.object({
  userId: z.string(),
  biography: z.string(),
  usernameColor: z.string(),
  mainLink: z.string(),
  shortDescription: z.string(),
})

export interface CompleteUserInfo extends z.infer<typeof UserInfoModel> {
  serverListOrder: CompleteServerListOrderElement[]
}

/**
 * RelatedUserInfoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserInfoModel: z.ZodSchema<CompleteUserInfo> = z.lazy(() => UserInfoModel.extend({
  serverListOrder: RelatedServerListOrderElementModel.array(),
}))
