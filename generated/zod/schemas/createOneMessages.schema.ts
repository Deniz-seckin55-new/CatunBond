import { z } from 'zod';
import { MessagesCreateInputObjectSchema } from './objects/MessagesCreateInput.schema';
import { MessagesUncheckedCreateInputObjectSchema } from './objects/MessagesUncheckedCreateInput.schema';

export const MessagesCreateOneSchema = z.object({
  data: z.union([
    MessagesCreateInputObjectSchema,
    MessagesUncheckedCreateInputObjectSchema,
  ]),
});
