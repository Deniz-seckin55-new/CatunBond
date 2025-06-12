import { z } from 'zod';
import { AuthWhereInputObjectSchema } from './objects/AuthWhereInput.schema';
import { AuthOrderByWithAggregationInputObjectSchema } from './objects/AuthOrderByWithAggregationInput.schema';
import { AuthScalarWhereWithAggregatesInputObjectSchema } from './objects/AuthScalarWhereWithAggregatesInput.schema';
import { AuthScalarFieldEnumSchema } from './enums/AuthScalarFieldEnum.schema';

export const AuthGroupBySchema = z.object({
  where: AuthWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      AuthOrderByWithAggregationInputObjectSchema,
      AuthOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: AuthScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(AuthScalarFieldEnumSchema),
});
