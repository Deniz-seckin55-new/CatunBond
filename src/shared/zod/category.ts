import * as z from "zod"

import { CompleteServer, RelatedServerModel, CompleteChannel, RelatedChannelModel } from "./index"

export const CategoryModel = z.object({
  id: z.string(),
  name: z.string(),
  serverId: z.string(),
  index: z.number().int(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  server: CompleteServer
  channels: CompleteChannel[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  server: RelatedServerModel,
  channels: RelatedChannelModel.array(),
}))
