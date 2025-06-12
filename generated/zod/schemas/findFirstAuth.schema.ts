import { z } from 'zod';
import { AuthOrderByWithRelationInputObjectSchema } from './objects/AuthOrderByWithRelationInput.schema';
import { AuthWhereInputObjectSchema } from './objects/AuthWhereInput.schema';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';
import { AuthScalarFieldEnumSchema } from './enums/AuthScalarFieldEnum.schema';

export const AuthFindFirstSchema = z.object({
  orderBy: z
    .union([
      AuthOrderByWithRelationInputObjectSchema,
      AuthOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: AuthWhereInputObjectSchema.optional(),
  cursor: AuthWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(AuthScalarFieldEnumSchema).optional(),
});
