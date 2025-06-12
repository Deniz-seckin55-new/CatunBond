import { z } from 'zod';
import { MessagesOrderByWithRelationInputObjectSchema } from './objects/MessagesOrderByWithRelationInput.schema';
import { MessagesWhereInputObjectSchema } from './objects/MessagesWhereInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';
import { MessagesCountAggregateInputObjectSchema } from './objects/MessagesCountAggregateInput.schema';
import { MessagesMinAggregateInputObjectSchema } from './objects/MessagesMinAggregateInput.schema';
import { MessagesMaxAggregateInputObjectSchema } from './objects/MessagesMaxAggregateInput.schema';

export const MessagesAggregateSchema = z.object({
  orderBy: z
    .union([
      MessagesOrderByWithRelationInputObjectSchema,
      MessagesOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: MessagesWhereInputObjectSchema.optional(),
  cursor: MessagesWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), MessagesCountAggregateInputObjectSchema])
    .optional(),
  _min: MessagesMinAggregateInputObjectSchema.optional(),
  _max: MessagesMaxAggregateInputObjectSchema.optional(),
});
