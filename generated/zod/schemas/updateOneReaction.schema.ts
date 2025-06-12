import { z } from 'zod';
import { ReactionUpdateInputObjectSchema } from './objects/ReactionUpdateInput.schema';
import { ReactionUncheckedUpdateInputObjectSchema } from './objects/ReactionUncheckedUpdateInput.schema';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';

export const ReactionUpdateOneSchema = z.object({
  data: z.union([
    ReactionUpdateInputObjectSchema,
    ReactionUncheckedUpdateInputObjectSchema,
  ]),
  where: ReactionWhereUniqueInputObjectSchema,
});
