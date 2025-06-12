import { z } from 'zod';
import { AuthUpdateManyMutationInputObjectSchema } from './objects/AuthUpdateManyMutationInput.schema';
import { AuthWhereInputObjectSchema } from './objects/AuthWhereInput.schema';

export const AuthUpdateManySchema = z.object({
  data: AuthUpdateManyMutationInputObjectSchema,
  where: AuthWhereInputObjectSchema.optional(),
});
