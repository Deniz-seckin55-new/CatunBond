import { z } from 'zod';
import { UserNoteCreateManyInputObjectSchema } from './objects/UserNoteCreateManyInput.schema';

export const UserNoteCreateManySchema = z.object({
  data: z.union([
    UserNoteCreateManyInputObjectSchema,
    z.array(UserNoteCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
