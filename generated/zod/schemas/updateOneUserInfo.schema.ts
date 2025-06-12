import { z } from 'zod';
import { UserInfoUpdateInputObjectSchema } from './objects/UserInfoUpdateInput.schema';
import { UserInfoUncheckedUpdateInputObjectSchema } from './objects/UserInfoUncheckedUpdateInput.schema';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';

export const UserInfoUpdateOneSchema = z.object({
  data: z.union([
    UserInfoUpdateInputObjectSchema,
    UserInfoUncheckedUpdateInputObjectSchema,
  ]),
  where: UserInfoWhereUniqueInputObjectSchema,
});
