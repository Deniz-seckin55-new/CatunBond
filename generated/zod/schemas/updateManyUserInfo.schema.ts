import { z } from 'zod';
import { UserInfoUpdateManyMutationInputObjectSchema } from './objects/UserInfoUpdateManyMutationInput.schema';
import { UserInfoWhereInputObjectSchema } from './objects/UserInfoWhereInput.schema';

export const UserInfoUpdateManySchema = z.object({
  data: UserInfoUpdateManyMutationInputObjectSchema,
  where: UserInfoWhereInputObjectSchema.optional(),
});
