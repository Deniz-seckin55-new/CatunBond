import { z } from 'zod';
import { UserInfoOrderByWithRelationInputObjectSchema } from './objects/UserInfoOrderByWithRelationInput.schema';
import { UserInfoWhereInputObjectSchema } from './objects/UserInfoWhereInput.schema';
import { UserInfoWhereUniqueInputObjectSchema } from './objects/UserInfoWhereUniqueInput.schema';
import { UserInfoCountAggregateInputObjectSchema } from './objects/UserInfoCountAggregateInput.schema';
import { UserInfoMinAggregateInputObjectSchema } from './objects/UserInfoMinAggregateInput.schema';
import { UserInfoMaxAggregateInputObjectSchema } from './objects/UserInfoMaxAggregateInput.schema';

export const UserInfoAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), UserInfoCountAggregateInputObjectSchema])
    .optional(),
  _min: UserInfoMinAggregateInputObjectSchema.optional(),
  _max: UserInfoMaxAggregateInputObjectSchema.optional(),
});
