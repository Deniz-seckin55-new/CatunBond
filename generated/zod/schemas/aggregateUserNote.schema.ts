import { z } from 'zod';
import { UserNoteOrderByWithRelationInputObjectSchema } from './objects/UserNoteOrderByWithRelationInput.schema';
import { UserNoteWhereInputObjectSchema } from './objects/UserNoteWhereInput.schema';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';
import { UserNoteCountAggregateInputObjectSchema } from './objects/UserNoteCountAggregateInput.schema';
import { UserNoteMinAggregateInputObjectSchema } from './objects/UserNoteMinAggregateInput.schema';
import { UserNoteMaxAggregateInputObjectSchema } from './objects/UserNoteMaxAggregateInput.schema';

export const UserNoteAggregateSchema = z.object({
  orderBy: z
    .union([
      UserNoteOrderByWithRelationInputObjectSchema,
      UserNoteOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserNoteWhereInputObjectSchema.optional(),
  cursor: UserNoteWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), UserNoteCountAggregateInputObjectSchema])
    .optional(),
  _min: UserNoteMinAggregateInputObjectSchema.optional(),
  _max: UserNoteMaxAggregateInputObjectSchema.optional(),
});
