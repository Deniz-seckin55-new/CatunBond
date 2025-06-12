import { z } from 'zod';
import { CategoryUpdateInputObjectSchema } from './objects/CategoryUpdateInput.schema';
import { CategoryUncheckedUpdateInputObjectSchema } from './objects/CategoryUncheckedUpdateInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryUpdateOneSchema = z.object({
  data: z.union([
    CategoryUpdateInputObjectSchema,
    CategoryUncheckedUpdateInputObjectSchema,
  ]),
  where: CategoryWhereUniqueInputObjectSchema,
});
