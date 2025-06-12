import * as z from "zod"


export const UserNoteModel = z.object({
  userId: z.string(),
  otherUserId: z.string(),
  note: z.string(),
})
