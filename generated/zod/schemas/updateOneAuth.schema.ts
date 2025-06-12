import { z } from 'zod';
import { AuthUpdateInputObjectSchema } from './objects/AuthUpdateInput.schema';
import { AuthUncheckedUpdateInputObjectSchema } from './objects/AuthUncheckedUpdateInput.schema';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';

export const AuthUpdateOneSchema = z.object({
  data: z.union([
    AuthUpdateInputObjectSchema,
    AuthUncheckedUpdateInputObjectSchema,
  ]),
  where: AuthWhereUniqueInputObjectSchema,
});
