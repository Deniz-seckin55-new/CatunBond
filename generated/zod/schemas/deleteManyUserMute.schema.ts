import { z } from 'zod';
import { UserMuteWhereInputObjectSchema } from './objects/UserMuteWhereInput.schema';

export const UserMuteDeleteManySchema = z.object({
  where: UserMuteWhereInputObjectSchema.optional(),
});
