import { z } from 'zod';
import { CategoryCreateInputObjectSchema } from './objects/CategoryCreateInput.schema';
import { CategoryUncheckedCreateInputObjectSchema } from './objects/CategoryUncheckedCreateInput.schema';

export const CategoryCreateOneSchema = z.object({
  data: z.union([
    CategoryCreateInputObjectSchema,
    CategoryUncheckedCreateInputObjectSchema,
  ]),
});
