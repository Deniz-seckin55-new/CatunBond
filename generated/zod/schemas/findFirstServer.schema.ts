import { z } from 'zod';
import { ServerOrderByWithRelationInputObjectSchema } from './objects/ServerOrderByWithRelationInput.schema';
import { ServerWhereInputObjectSchema } from './objects/ServerWhereInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';
import { ServerScalarFieldEnumSchema } from './enums/ServerScalarFieldEnum.schema';

export const ServerFindFirstSchema = z.object({
  orderBy: z
    .union([
      ServerOrderByWithRelationInputObjectSchema,
      ServerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerWhereInputObjectSchema.optional(),
  cursor: ServerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ServerScalarFieldEnumSchema).optional(),
});
