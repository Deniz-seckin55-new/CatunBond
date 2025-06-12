import * as z from "zod"

import { MutedInType, MuteType } from "@prisma/client"

export const UserMuteModel = z.object({
  userId: z.string(),
  startedAt: z.date(),
  endsAt: z.date(),
  mutedIn: z.string(),
  mutedInType: z.nativeEnum(MutedInType),
  muteType: z.nativeEnum(MuteType),
})
