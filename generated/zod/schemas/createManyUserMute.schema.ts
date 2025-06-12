import { z } from 'zod';
import { UserMuteCreateManyInputObjectSchema } from './objects/UserMuteCreateManyInput.schema';

export const UserMuteCreateManySchema = z.object({
  data: z.union([
    UserMuteCreateManyInputObjectSchema,
    z.array(UserMuteCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
