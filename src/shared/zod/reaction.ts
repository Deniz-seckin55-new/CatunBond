import * as z from "zod"

import { CompleteMessages, RelatedMessagesModel } from "./index"

export const ReactionModel = z.object({
  id: z.string(),
  userId: z.string(),
  emojiName: z.string(),
  messageId: z.string(),
  channelId: z.string(),
})

export interface CompleteReaction extends z.infer<typeof ReactionModel> {
  message: CompleteMessages
}

/**
 * RelatedReactionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReactionModel: z.ZodSchema<CompleteReaction> = z.lazy(() => ReactionModel.extend({
  message: RelatedMessagesModel,
}))
