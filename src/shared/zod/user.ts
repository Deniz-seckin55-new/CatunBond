import * as z from "zod"

import { CompleteAuth, RelatedAuthModel, CompleteFriendRequest, RelatedFriendRequestModel, CompleteMessages, RelatedMessagesModel, CompleteVoiceChat, RelatedVoiceChatModel, CompleteChannel, RelatedChannelModel, CompleteServer, RelatedServerModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const UserModel = z.object({
  id: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullish(),
  blocked: z.string().array(),
  voiceChatChannelId: z.string().nullish(),
  variables: jsonSchema,
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  auth?: CompleteAuth | null
  receivedRequests: CompleteFriendRequest[]
  sentRequests: CompleteFriendRequest[]
  messages: CompleteMessages[]
  VoiceChat?: CompleteVoiceChat | null
  directMsgs: CompleteChannel[]
  friends: CompleteUser[]
  friendOf: CompleteUser[]
  servers: CompleteServer[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  auth: RelatedAuthModel.nullish(),
  receivedRequests: RelatedFriendRequestModel.array(),
  sentRequests: RelatedFriendRequestModel.array(),
  messages: RelatedMessagesModel.array(),
  VoiceChat: RelatedVoiceChatModel.nullish(),
  directMsgs: RelatedChannelModel.array(),
  friends: RelatedUserModel.array(),
  friendOf: RelatedUserModel.array(),
  servers: RelatedServerModel.array(),
}))
