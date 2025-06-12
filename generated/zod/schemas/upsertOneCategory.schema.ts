import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';
import { CategoryCreateInputObjectSchema } from './objects/CategoryCreateInput.schema';
import { CategoryUncheckedCreateInputObjectSchema } from './objects/CategoryUncheckedCreateInput.schema';
import { CategoryUpdateInputObjectSchema } from './objects/CategoryUpdateInput.schema';
import { CategoryUncheckedUpdateInputObjectSchema } from './objects/CategoryUncheckedUpdateInput.schema';

export const CategoryUpsertSchema = z.object({
  where: CategoryWhereUniqueInputObjectSchema,
  create: z.union([
    CategoryCreateInputObjectSchema,
    CategoryUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CategoryUpdateInputObjectSchema,
    CategoryUncheckedUpdateInputObjectSchema,
  ]),
});
