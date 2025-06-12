import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './objects/CategoryWhereUniqueInput.schema';

export const CategoryDeleteOneSchema = z.object({
  where: CategoryWhereUniqueInputObjectSchema,
});
