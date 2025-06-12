import { z } from 'zod';
import { UserNoteUpdateManyMutationInputObjectSchema } from './objects/UserNoteUpdateManyMutationInput.schema';
import { UserNoteWhereInputObjectSchema } from './objects/UserNoteWhereInput.schema';

export const UserNoteUpdateManySchema = z.object({
  data: UserNoteUpdateManyMutationInputObjectSchema,
  where: UserNoteWhereInputObjectSchema.optional(),
});
