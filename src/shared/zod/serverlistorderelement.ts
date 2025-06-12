import * as z from "zod"

import { CompleteUserInfo, RelatedUserInfoModel } from "./index"

export const ServerListOrderElementModel = z.object({
  id: z.string(),
  index: z.number().int(),
  userInfoUserId: z.string().nullish(),
})

export interface CompleteServerListOrderElement extends z.infer<typeof ServerListOrderElementModel> {
  UserInfo?: CompleteUserInfo | null
}

/**
 * RelatedServerListOrderElementModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServerListOrderElementModel: z.ZodSchema<CompleteServerListOrderElement> = z.lazy(() => ServerListOrderElementModel.extend({
  UserInfo: RelatedUserInfoModel.nullish(),
}))
