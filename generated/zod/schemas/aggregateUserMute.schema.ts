import { z } from 'zod';
import { UserMuteOrderByWithRelationInputObjectSchema } from './objects/UserMuteOrderByWithRelationInput.schema';
import { UserMuteWhereInputObjectSchema } from './objects/UserMuteWhereInput.schema';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';
import { UserMuteCountAggregateInputObjectSchema } from './objects/UserMuteCountAggregateInput.schema';
import { UserMuteMinAggregateInputObjectSchema } from './objects/UserMuteMinAggregateInput.schema';
import { UserMuteMaxAggregateInputObjectSchema } from './objects/UserMuteMaxAggregateInput.schema';

export const UserMuteAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), UserMuteCountAggregateInputObjectSchema])
    .optional(),
  _min: UserMuteMinAggregateInputObjectSchema.optional(),
  _max: UserMuteMaxAggregateInputObjectSchema.optional(),
});
