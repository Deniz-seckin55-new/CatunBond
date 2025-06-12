import * as z from "zod"

import { CompleteUser, RelatedUserModel } from "./index"

export const VoiceChatModel = z.object({
  channelId: z.string(),
  serverId: z.string().nullish(),
  createdAt: z.date(),
})

export interface CompleteVoiceChat extends z.infer<typeof VoiceChatModel> {
  members: CompleteUser[]
}

/**
 * RelatedVoiceChatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVoiceChatModel: z.ZodSchema<CompleteVoiceChat> = z.lazy(() => VoiceChatModel.extend({
  members: RelatedUserModel.array(),
}))
