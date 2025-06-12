import * as z from "zod"

import { ChannelType } from "@prisma/client"

export const ChannelInfoModel = z.object({
  channelId: z.string(),
  name: z.string(),
  type: z.nativeEnum(ChannelType),
  description: z.string(),
  slowMode: z.number().int(),
  readOnly: z.boolean(),
  nsfw: z.boolean(),
  pinnedMessages: z.string().array(),
})
