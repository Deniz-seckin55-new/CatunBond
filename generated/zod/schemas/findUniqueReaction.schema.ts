import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';

export const ReactionFindUniqueSchema = z.object({
  where: ReactionWhereUniqueInputObjectSchema,
});
