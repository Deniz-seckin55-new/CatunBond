import { z } from 'zod';
import { AuthWhereInputObjectSchema } from './objects/AuthWhereInput.schema';

export const AuthDeleteManySchema = z.object({
  where: AuthWhereInputObjectSchema.optional(),
});
