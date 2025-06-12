import * as z from "zod"

import { CompleteCategory, RelatedCategoryModel, CompleteUser, RelatedUserModel } from "./index"

export const ServerModel = z.object({
  id: z.string(),
  iconUrl: z.string(),
  name: z.string(),
  ownerId: z.string(),
  invites: z.string().array(),
})

export interface CompleteServer extends z.infer<typeof ServerModel> {
  categories: CompleteCategory[]
  members: CompleteUser[]
}

/**
 * RelatedServerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServerModel: z.ZodSchema<CompleteServer> = z.lazy(() => ServerModel.extend({
  categories: RelatedCategoryModel.array(),
  members: RelatedUserModel.array(),
}))
