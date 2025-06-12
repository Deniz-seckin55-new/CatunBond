import { z } from 'zod';
import { ReactionUpdateManyMutationInputObjectSchema } from './objects/ReactionUpdateManyMutationInput.schema';
import { ReactionWhereInputObjectSchema } from './objects/ReactionWhereInput.schema';

export const ReactionUpdateManySchema = z.object({
  data: ReactionUpdateManyMutationInputObjectSchema,
  where: ReactionWhereInputObjectSchema.optional(),
});
