import { z } from 'zod';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';

export const AuthFindUniqueSchema = z.object({
  where: AuthWhereUniqueInputObjectSchema,
});
