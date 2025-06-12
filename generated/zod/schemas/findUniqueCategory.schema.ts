import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryFindUniqueSchema = z.object({
  where: CategoryWhereUniqueInputObjectSchema,
});
