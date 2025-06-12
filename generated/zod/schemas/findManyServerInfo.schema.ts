import { z } from 'zod';
import { ServerInfoOrderByWithRelationInputObjectSchema } from './objects/ServerInfoOrderByWithRelationInput.schema';
import { ServerInfoWhereInputObjectSchema } from './objects/ServerInfoWhereInput.schema';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';
import { ServerInfoScalarFieldEnumSchema } from './enums/ServerInfoScalarFieldEnum.schema';

export const ServerInfoFindManySchema = z.object({
  orderBy: z
    .union([
      ServerInfoOrderByWithRelationInputObjectSchema,
      ServerInfoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerInfoWhereInputObjectSchema.optional(),
  cursor: ServerInfoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ServerInfoScalarFieldEnumSchema).optional(),
});
