import { z } from 'zod';
import { MessagesWhereInputObjectSchema } from './objects/MessagesWhereInput.schema';

export const MessagesDeleteManySchema = z.object({
  where: MessagesWhereInputObjectSchema.optional(),
});
