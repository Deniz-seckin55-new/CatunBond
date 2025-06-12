import { z } from 'zod';
import { AuthOrderByWithRelationInputObjectSchema } from './objects/AuthOrderByWithRelationInput.schema';
import { AuthWhereInputObjectSchema } from './objects/AuthWhereInput.schema';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';
import { AuthCountAggregateInputObjectSchema } from './objects/AuthCountAggregateInput.schema';
import { AuthMinAggregateInputObjectSchema } from './objects/AuthMinAggregateInput.schema';
import { AuthMaxAggregateInputObjectSchema } from './objects/AuthMaxAggregateInput.schema';

export const AuthAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), AuthCountAggregateInputObjectSchema])
    .optional(),
  _min: AuthMinAggregateInputObjectSchema.optional(),
  _max: AuthMaxAggregateInputObjectSchema.optional(),
});
