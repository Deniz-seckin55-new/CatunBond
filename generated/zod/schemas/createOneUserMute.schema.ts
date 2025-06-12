import { z } from 'zod';
import { UserMuteCreateInputObjectSchema } from './objects/UserMuteCreateInput.schema';
import { UserMuteUncheckedCreateInputObjectSchema } from './objects/UserMuteUncheckedCreateInput.schema';

export const UserMuteCreateOneSchema = z.object({
  data: z.union([
    UserMuteCreateInputObjectSchema,
    UserMuteUncheckedCreateInputObjectSchema,
  ]),
});
