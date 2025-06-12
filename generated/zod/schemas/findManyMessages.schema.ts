import { z } from 'zod';
import { MessagesOrderByWithRelationInputObjectSchema } from './objects/MessagesOrderByWithRelationInput.schema';
import { MessagesWhereInputObjectSchema } from './objects/MessagesWhereInput.schema';
import { MessagesWhereUniqueInputObjectSchema } from './objects/MessagesWhereUniqueInput.schema';
import { MessagesScalarFieldEnumSchema } from './enums/MessagesScalarFieldEnum.schema';

export const MessagesFindManySchema = z.object({
  orderBy: z
    .union([
      MessagesOrderByWithRelationInputObjectSchema,
      MessagesOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: MessagesWhereInputObjectSchema.optional(),
  cursor: MessagesWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(MessagesScalarFieldEnumSchema).optional(),
});
