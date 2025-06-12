import { z } from 'zod';
import { UserMuteWhereUniqueInputObjectSchema } from './objects/UserMuteWhereUniqueInput.schema';

export const UserMuteFindUniqueSchema = z.object({
  where: UserMuteWhereUniqueInputObjectSchema,
});
