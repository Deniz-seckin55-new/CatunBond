import { z } from 'zod';
import { UserNoteWhereInputObjectSchema } from './objects/UserNoteWhereInput.schema';

export const UserNoteDeleteManySchema = z.object({
  where: UserNoteWhereInputObjectSchema.optional(),
});
