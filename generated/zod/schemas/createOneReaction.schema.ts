import { z } from 'zod';
import { ReactionCreateInputObjectSchema } from './objects/ReactionCreateInput.schema';
import { ReactionUncheckedCreateInputObjectSchema } from './objects/ReactionUncheckedCreateInput.schema';

export const ReactionCreateOneSchema = z.object({
  data: z.union([
    ReactionCreateInputObjectSchema,
    ReactionUncheckedCreateInputObjectSchema,
  ]),
});
