import { z } from 'zod';
import { MessagesCreateManyInputObjectSchema } from './objects/MessagesCreateManyInput.schema';

export const MessagesCreateManySchema = z.object({
  data: z.union([
    MessagesCreateManyInputObjectSchema,
    z.array(MessagesCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
