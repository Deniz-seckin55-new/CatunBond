import { z } from 'zod';
import { UserMuteOrderByWithRelationInputObjectSchema } from './objects/UserMuteOrderByWithRelationInput.schema';
import { UserMuteWhereInputObjectSchema } from './objects/UserMuteWhereInput.schema';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';
import { UserMuteScalarFieldEnumSchema } from './enums/UserMuteScalarFieldEnum.schema';

export const UserMuteFindFirstSchema = z.object({
  orderBy: z
    .union([
      UserMuteOrderByWithRelationInputObjectSchema,
      UserMuteOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserMuteWhereInputObjectSchema.optional(),
  cursor: UserMuteWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(UserMuteScalarFieldEnumSchema).optional(),
});
