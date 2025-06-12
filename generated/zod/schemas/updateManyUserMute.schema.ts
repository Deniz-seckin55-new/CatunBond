import { z } from 'zod';
import { UserMuteUpdateManyMutationInputObjectSchema } from './objects/UserMuteUpdateManyMutationInput.schema';
import { UserMuteWhereInputObjectSchema } from './objects/UserMuteWhereInput.schema';

export const UserMuteUpdateManySchema = z.object({
  data: UserMuteUpdateManyMutationInputObjectSchema,
  where: UserMuteWhereInputObjectSchema.optional(),
});
