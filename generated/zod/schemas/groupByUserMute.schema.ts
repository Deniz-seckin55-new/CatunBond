import { z } from 'zod';
import { UserMuteWhereInputObjectSchema } from './objects/UserMuteWhereInput.schema';
import { UserMuteOrderByWithAggregationInputObjectSchema } from './objects/UserMuteOrderByWithAggregationInput.schema';
import { UserMuteScalarWhereWithAggregatesInputObjectSchema } from './objects/UserMuteScalarWhereWithAggregatesInput.schema';
import { UserMuteScalarFieldEnumSchema } from './enums/UserMuteScalarFieldEnum.schema';

export const UserMuteGroupBySchema = z.object({
  where: UserMuteWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserMuteOrderByWithAggregationInputObjectSchema,
      UserMuteOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserMuteScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserMuteScalarFieldEnumSchema),
});
