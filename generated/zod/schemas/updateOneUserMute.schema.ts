import { z } from 'zod';
import { UserMuteUpdateInputObjectSchema } from './objects/UserMuteUpdateInput.schema';
import { UserMuteUncheckedUpdateInputObjectSchema } from './objects/UserMuteUncheckedUpdateInput.schema';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';

export const UserMuteUpdateOneSchema = z.object({
  data: z.union([
    UserMuteUpdateInputObjectSchema,
    UserMuteUncheckedUpdateInputObjectSchema,
  ]),
  where: UserMuteWhereUniqueInputObjectSchema,
});
