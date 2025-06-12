import { z } from 'zod';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';

export const UserInfoDeleteOneSchema = z.object({
  where: UserInfoWhereUniqueInputObjectSchema,
});
