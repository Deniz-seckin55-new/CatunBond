import { z } from 'zod';
import { UserInfoCreateManyInputObjectSchema } from './objects/UserInfoCreateManyInput.schema';

export const UserInfoCreateManySchema = z.object({
  data: z.union([
    UserInfoCreateManyInputObjectSchema,
    z.array(UserInfoCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
