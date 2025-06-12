import { z } from 'zod';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';

export const UserNoteDeleteOneSchema = z.object({
  where: UserNoteWhereUniqueInputObjectSchema,
});
