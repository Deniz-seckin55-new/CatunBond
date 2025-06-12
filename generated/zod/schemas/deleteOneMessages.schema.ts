import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';

export const MessagesDeleteOneSchema = z.object({
  where: MessagesWhereUniqueInputObjectSchema,
});
