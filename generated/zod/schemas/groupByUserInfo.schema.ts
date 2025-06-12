import { z } from 'zod';
import { UserInfoWhereInputObjectSchema } from './objects/UserInfoWhereInput.schema';
import { UserInfoOrderByWithAggregationInputObjectSchema } from './objects/UserInfoOrderByWithAggregationInput.schema';
import { UserInfoScalarWhereWithAggregatesInputObjectSchema } from './objects/UserInfoScalarWhereWithAggregatesInput.schema';
import { UserInfoScalarFieldEnumSchema } from './enums/UserInfoScalarFieldEnum.schema';

export const UserInfoGroupBySchema = z.object({
  where: UserInfoWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserInfoOrderByWithAggregationInputObjectSchema,
      UserInfoOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserInfoScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserInfoScalarFieldEnumSchema),
});
