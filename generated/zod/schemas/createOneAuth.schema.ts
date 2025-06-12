import { z } from 'zod';
import { AuthCreateInputObjectSchema } from './objects/AuthCreateInput.schema';
import { AuthUncheckedCreateInputObjectSchema } from './objects/AuthUncheckedCreateInput.schema';

export const AuthCreateOneSchema = z.object({
  data: z.union([
    AuthCreateInputObjectSchema,
    AuthUncheckedCreateInputObjectSchema,
  ]),
});
