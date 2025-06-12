import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';
import { MessagesCreateInputObjectSchema } from './objects/MessagesCreateInput.schema';
import { MessagesUncheckedCreateInputObjectSchema } from './objects/MessagesUncheckedCreateInput.schema';
import { MessagesUpdateInputObjectSchema } from './objects/MessagesUpdateInput.schema';
import { MessagesUncheckedUpdateInputObjectSchema } from './objects/MessagesUncheckedUpdateInput.schema';

export const MessagesUpsertSchema = z.object({
  where: MessagesWhereUniqueInputObjectSchema,
  create: z.union([
    MessagesCreateInputObjectSchema,
    MessagesUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    MessagesUpdateInputObjectSchema,
    MessagesUncheckedUpdateInputObjectSchema,
  ]),
});
