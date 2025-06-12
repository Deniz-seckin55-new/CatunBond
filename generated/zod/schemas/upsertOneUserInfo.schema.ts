import { z } from 'zod';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';
import { UserInfoCreateInputObjectSchema } from './objects/UserInfoCreateInput.schema';
import { UserInfoUncheckedCreateInputObjectSchema } from './objects/UserInfoUncheckedCreateInput.schema';
import { UserInfoUpdateInputObjectSchema } from './objects/UserInfoUpdateInput.schema';
import { UserInfoUncheckedUpdateInputObjectSchema } from './objects/UserInfoUncheckedUpdateInput.schema';

export const UserInfoUpsertSchema = z.object({
  where: UserInfoWhereUniqueInputObjectSchema,
  create: z.union([
    UserInfoCreateInputObjectSchema,
    UserInfoUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    UserInfoUpdateInputObjectSchema,
    UserInfoUncheckedUpdateInputObjectSchema,
  ]),
});
