import { z } from 'zod';
import { ReactionCreateManyInputObjectSchema } from './objects/ReactionCreateManyInput.schema';

export const ReactionCreateManySchema = z.object({
  data: z.union([
    ReactionCreateManyInputObjectSchema,
    z.array(ReactionCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
