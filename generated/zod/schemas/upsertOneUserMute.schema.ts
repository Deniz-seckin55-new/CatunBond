import { z } from 'zod';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';
import { UserMuteCreateInputObjectSchema } from './objects/UserMuteCreateInput.schema';
import { UserMuteUncheckedCreateInputObjectSchema } from './objects/UserMuteUncheckedCreateInput.schema';
import { UserMuteUpdateInputObjectSchema } from './objects/UserMuteUpdateInput.schema';
import { UserMuteUncheckedUpdateInputObjectSchema } from './objects/UserMuteUncheckedUpdateInput.schema';

export const UserMuteUpsertSchema = z.object({
  where: UserMuteWhereUniqueInputObjectSchema,
  create: z.union([
    UserMuteCreateInputObjectSchema,
    UserMuteUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    UserMuteUpdateInputObjectSchema,
    UserMuteUncheckedUpdateInputObjectSchema,
  ]),
});
