import { z } from 'zod';
import { UserNoteUpdateInputObjectSchema } from './objects/UserNoteUpdateInput.schema';
import { UserNoteUncheckedUpdateInputObjectSchema } from './objects/UserNoteUncheckedUpdateInput.schema';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';

export const UserNoteUpdateOneSchema = z.object({
  data: z.union([
    UserNoteUpdateInputObjectSchema,
    UserNoteUncheckedUpdateInputObjectSchema,
  ]),
  where: UserNoteWhereUniqueInputObjectSchema,
});
