import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';

export const MessagesFindUniqueSchema = z.object({
  where: MessagesWhereUniqueInputObjectSchema,
});
