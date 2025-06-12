import { z } from 'zod';
import { MessagesUpdateManyMutationInputObjectSchema } from './objects/MessagesUpdateManyMutationInput.schema';
import { MessagesWhereInputObjectSchema } from './objects/MessagesWhereInput.schema';

export const MessagesUpdateManySchema = z.object({
  data: MessagesUpdateManyMutationInputObjectSchema,
  where: MessagesWhereInputObjectSchema.optional(),
});
