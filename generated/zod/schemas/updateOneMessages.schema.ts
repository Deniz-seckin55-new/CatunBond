import { z } from 'zod';
import { MessagesUpdateInputObjectSchema } from './objects/MessagesUpdateInput.schema';
import { MessagesUncheckedUpdateInputObjectSchema } from './objects/MessagesUncheckedUpdateInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';

export const MessagesUpdateOneSchema = z.object({
  data: z.union([
    MessagesUpdateInputObjectSchema,
    MessagesUncheckedUpdateInputObjectSchema,
  ]),
  where: MessagesWhereUniqueInputObjectSchema,
});
