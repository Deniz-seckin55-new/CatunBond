import { z } from 'zod';
import { UserNoteOrderByWithRelationInputObjectSchema } from './objects/UserNoteOrderByWithRelationInput.schema';
import { UserNoteWhereInputObjectSchema } from './objects/UserNoteWhereInput.schema';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';
import { UserNoteScalarFieldEnumSchema } from './enums/UserNoteScalarFieldEnum.schema';

export const UserNoteFindFirstSchema = z.object({
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
  distinct: z.array(UserNoteScalarFieldEnumSchema).optional(),
});
