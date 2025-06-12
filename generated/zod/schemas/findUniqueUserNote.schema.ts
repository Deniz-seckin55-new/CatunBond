import { z } from 'zod';
import { UserNoteWhereUniqueInputObjectSchema } from './objects/UserNoteWhereUniqueInput.schema';

export const UserNoteFindUniqueSchema = z.object({
  where: UserNoteWhereUniqueInputObjectSchema,
});
