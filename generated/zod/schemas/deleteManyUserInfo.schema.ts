import { z } from 'zod';
import { UserInfoWhereInputObjectSchema } from './objects/UserInfoWhereInput.schema';

export const UserInfoDeleteManySchema = z.object({
  where: UserInfoWhereInputObjectSchema.optional(),
});
