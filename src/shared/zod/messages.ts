import * as z from "zod"

import { CompleteUser, RelatedUserModel, CompleteChannel, RelatedChannelModel, CompleteReaction, RelatedReactionModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const MessagesModel = z.object({
  id: z.string(),
  content: z.string(),
  timestamp: z.date(),
  authorId: z.string(),
  channelId: z.string(),
  repliedToId: z.string().nullish(),
  attachments: jsonSchema,
  mentions: z.string().array(),
})

export interface CompleteMessages extends z.infer<typeof MessagesModel> {
  author: CompleteUser
  channel: CompleteChannel
  repliedTo?: CompleteMessages | null
  replies: CompleteMessages[]
  reactions: CompleteReaction[]
}

/**
 * RelatedMessagesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessagesModel: z.ZodSchema<CompleteMessages> = z.lazy(() => MessagesModel.extend({
  author: RelatedUserModel,
  channel: RelatedChannelModel,
  repliedTo: RelatedMessagesModel.nullish(),
  replies: RelatedMessagesModel.array(),
  reactions: RelatedReactionModel.array(),
}))
