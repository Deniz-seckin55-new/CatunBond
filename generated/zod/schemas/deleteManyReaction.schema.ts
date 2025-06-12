import { z } from 'zod';
import { ReactionWhereInputObjectSchema } from './objects/ReactionWhereInput.schema';

export const ReactionDeleteManySchema = z.object({
  where: ReactionWhereInputObjectSchema.optional(),
});
