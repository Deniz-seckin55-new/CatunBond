import { z } from 'zod';
import { ServerListOrderElementOrderByWithRelationInputObjectSchema } from './objects/ServerListOrderElementOrderByWithRelationInput.schema';
import { ServerListOrderElementWhereInputObjectSchema } from './objects/ServerListOrderElementWhereInput.schema';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementScalarFieldEnumSchema } from './enums/ServerListOrderElementScalarFieldEnum.schema';

export const ServerListOrderElementFindFirstSchema = z.object({
  orderBy: z
    .union([
      ServerListOrderElementOrderByWithRelationInputObjectSchema,
      ServerListOrderElementOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServerListOrderElementWhereInputObjectSchema.optional(),
  cursor: ServerListOrderElementWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ServerListOrderElementScalarFieldEnumSchema).optional(),
});
