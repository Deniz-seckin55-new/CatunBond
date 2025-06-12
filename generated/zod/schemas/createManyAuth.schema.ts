import { z } from 'zod';
import { AuthCreateManyInputObjectSchema } from './objects/AuthCreateManyInput.schema';

export const AuthCreateManySchema = z.object({
  data: z.union([
    AuthCreateManyInputObjectSchema,
    z.array(AuthCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
