import { z } from 'zod';
import { ServerInfoWhereInputObjectSchema } from './objects/ServerInfoWhereInput.schema';

export const ServerInfoDeleteManySchema = z.object({
  where: ServerInfoWhereInputObjectSchema.optional(),
});
