import { z } from 'zod';
import { UserNoteCreateInputObjectSchema } from './objects/UserNoteCreateInput.schema';
import { UserNoteUncheckedCreateInputObjectSchema } from './objects/UserNoteUncheckedCreateInput.schema';

export const UserNoteCreateOneSchema = z.object({
  data: z.union([
    UserNoteCreateInputObjectSchema,
    UserNoteUncheckedCreateInputObjectSchema,
  ]),
});
