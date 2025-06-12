import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './objects/ReactionWhereUniqueInput.schema';
import { ReactionCreateInputObjectSchema } from './objects/ReactionCreateInput.schema';
import { ReactionUncheckedCreateInputObjectSchema } from './objects/ReactionUncheckedCreateInput.schema';
import { ReactionUpdateInputObjectSchema } from './objects/ReactionUpdateInput.schema';
import { ReactionUncheckedUpdateInputObjectSchema } from './objects/ReactionUncheckedUpdateInput.schema';

export const ReactionUpsertSchema = z.object({
  where: ReactionWhereUniqueInputObjectSchema,
  create: z.union([
    ReactionCreateInputObjectSchema,
    ReactionUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ReactionUpdateInputObjectSchema,
    ReactionUncheckedUpdateInputObjectSchema,
  ]),
});
