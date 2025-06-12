import { z } from 'zod';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';
import { UserNoteCreateInputObjectSchema } from './objects/UserNoteCreateInput.schema';
import { UserNoteUncheckedCreateInputObjectSchema } from './objects/UserNoteUncheckedCreateInput.schema';
import { UserNoteUpdateInputObjectSchema } from './objects/UserNoteUpdateInput.schema';
import { UserNoteUncheckedUpdateInputObjectSchema } from './objects/UserNoteUncheckedUpdateInput.schema';

export const UserNoteUpsertSchema = z.object({
  where: UserNoteWhereUniqueInputObjectSchema,
  create: z.union([
    UserNoteCreateInputObjectSchema,
    UserNoteUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    UserNoteUpdateInputObjectSchema,
    UserNoteUncheckedUpdateInputObjectSchema,
  ]),
});
