import * as z from "zod"

import { CompleteUser, RelatedUserModel } from "./index"

export const AuthModel = z.object({
  userId: z.string(),
  password_hash: z.string(),
  salt: z.string(),
})

export interface CompleteAuth extends z.infer<typeof AuthModel> {
  id: CompleteUser
}

/**
 * RelatedAuthModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuthModel: z.ZodSchema<CompleteAuth> = z.lazy(() => AuthModel.extend({
  id: RelatedUserModel,
}))
