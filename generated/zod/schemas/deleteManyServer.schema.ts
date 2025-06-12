import { z } from 'zod';
import { ServerWhereInputObjectSchema } from './objects/ServerWhereInput.schema';

export const ServerDeleteManySchema = z.object({
  where: ServerWhereInputObjectSchema.optional(),
});
