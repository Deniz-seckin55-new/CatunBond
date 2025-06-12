import { z } from 'zod';
import { ServerListOrderElementUpdateManyMutationInputObjectSchema } from './objects/ServerListOrderElementUpdateManyMutationInput.schema';
import { ServerListOrderElementWhereInputObjectSchema } from './objects/ServerListOrderElementWhereInput.schema';

export const ServerListOrderElementUpdateManySchema = z.object({
  data: ServerListOrderElementUpdateManyMutationInputObjectSchema,
  where: ServerListOrderElementWhereInputObjectSchema.optional(),
});
