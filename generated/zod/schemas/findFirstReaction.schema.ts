import { z } from 'zod';
import { ReactionOrderByWithRelationInputObjectSchema } from './objects/ReactionOrderByWithRelationInput.schema';
import { ReactionWhereInputObjectSchema } from './objects/ReactionWhereInput.schema';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';
import { ReactionScalarFieldEnumSchema } from './enums/ReactionScalarFieldEnum.schema';

export const ReactionFindFirstSchema = z.object({
  orderBy: z
    .union([
      ReactionOrderByWithRelationInputObjectSchema,
      ReactionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ReactionWhereInputObjectSchema.optional(),
  cursor: ReactionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ReactionScalarFieldEnumSchema).optional(),
});
