import { z } from 'zod';
import { UserNoteWhereInputObjectSchema } from './objects/UserNoteWhereInput.schema';
import { UserNoteOrderByWithAggregationInputObjectSchema } from './objects/UserNoteOrderByWithAggregationInput.schema';
import { UserNoteScalarWhereWithAggregatesInputObjectSchema } from './objects/UserNoteScalarWhereWithAggregatesInput.schema';
import { UserNoteScalarFieldEnumSchema } from './enums/UserNoteScalarFieldEnum.schema';

export const UserNoteGroupBySchema = z.object({
  where: UserNoteWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserNoteOrderByWithAggregationInputObjectSchema,
      UserNoteOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserNoteScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserNoteScalarFieldEnumSchema),
});
