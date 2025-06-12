import { z } from 'zod';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';

export const UserMuteDeleteOneSchema = z.object({
  where: UserMuteWhereUniqueInputObjectSchema,
});
