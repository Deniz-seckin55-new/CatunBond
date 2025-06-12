import { z } from 'zod';
import { UserInfoOrderByWithRelationInputObjectSchema } from './objects/UserInfoOrderByWithRelationInput.schema';
import { UserInfoWhereInputObjectSchema } from './objects/UserInfoWhereInput.schema';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';
import { UserInfoScalarFieldEnumSchema } from './enums/UserInfoScalarFieldEnum.schema';

export const UserInfoFindManySchema = z.object({
  orderBy: z
    .union([
      UserInfoOrderByWithRelationInputObjectSchema,
      UserInfoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserInfoWhereInputObjectSchema.optional(),
  cursor: UserInfoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(UserInfoScalarFieldEnumSchema).optional(),
});
