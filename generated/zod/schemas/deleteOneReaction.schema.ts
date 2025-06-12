import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';

export const ReactionDeleteOneSchema = z.object({
  where: ReactionWhereUniqueInputObjectSchema,
});
