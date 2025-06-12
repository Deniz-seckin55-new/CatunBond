import * as z from "zod"

import { ChannelType } from "@prisma/client"
import { CompleteCategory, RelatedCategoryModel, CompleteMessages, RelatedMessagesModel, CompleteUser, RelatedUserModel } from "./index"

export const ChannelModel = z.object({
  id: z.string(),
  name: z.string(),
  channelType: z.nativeEnum(ChannelType),
  categoryId: z.string().nullish(),
  index: z.number().int(),
})

export interface CompleteChannel extends z.infer<typeof ChannelModel> {
  category?: CompleteCategory | null
  messages: CompleteMessages[]
  directMsgFor: CompleteUser[]
}

/**
 * RelatedChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChannelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => ChannelModel.extend({
  category: RelatedCategoryModel.nullish(),
  messages: RelatedMessagesModel.array(),
  directMsgFor: RelatedUserModel.array(),
}))
