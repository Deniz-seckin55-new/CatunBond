import { z } from 'zod';
import { MessagesWhereInputObjectSchema } from './objects/MessagesWhereInput.schema';
import { MessagesOrderByWithAggregationInputObjectSchema } from './objects/MessagesOrderByWithAggregationInput.schema';
import { MessagesScalarWhereWithAggregatesInputObjectSchema } from './objects/MessagesScalarWhereWithAggregatesInput.schema';
import { MessagesScalarFieldEnumSchema } from './enums/MessagesScalarFieldEnum.schema';

export const MessagesGroupBySchema = z.object({
  where: MessagesWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      MessagesOrderByWithAggregationInputObjectSchema,
      MessagesOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: MessagesScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(MessagesScalarFieldEnumSchema),
});
