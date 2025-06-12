import { z } from 'zod';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';

export const UserInfoFindUniqueSchema = z.object({
  where: UserInfoWhereUniqueInputObjectSchema,
});
