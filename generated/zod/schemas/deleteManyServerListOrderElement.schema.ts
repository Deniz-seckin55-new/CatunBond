import { z } from 'zod';
import { ServerListOrderElementWhereInputObjectSchema } from './objects/ServerListOrderElementWhereInput.schema';

export const ServerListOrderElementDeleteManySchema = z.object({
  where: ServerListOrderElementWhereInputObjectSchema.optional(),
});
