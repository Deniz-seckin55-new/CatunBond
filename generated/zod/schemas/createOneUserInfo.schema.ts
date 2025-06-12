import { z } from 'zod';
import { UserInfoCreateInputObjectSchema } from './objects/UserInfoCreateInput.schema';
import { UserInfoUncheckedCreateInputObjectSchema } from './objects/UserInfoUncheckedCreateInput.schema';

export const UserInfoCreateOneSchema = z.object({
  data: z.union([
    UserInfoCreateInputObjectSchema,
    UserInfoUncheckedCreateInputObjectSchema,
  ]),
});
