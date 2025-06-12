import { z } from 'zod';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';

export const AuthDeleteOneSchema = z.object({
  where: AuthWhereUniqueInputObjectSchema,
});
