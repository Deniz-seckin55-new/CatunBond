import * as z from "zod"


export const ServerInfoModel = z.object({
  serverId: z.string(),
  name: z.string(),
  iconUrl: z.string(),
  maxUsers: z.number().int(),
  color: z.string(),
  description: z.string(),
  slogan: z.string().nullish(),
  rules: z.string().array(),
})
