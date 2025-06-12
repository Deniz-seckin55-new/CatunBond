import { z } from 'zod';
import { ServerInfoUpdateManyMutationInputObjectSchema } from './objects/ServerInfoUpdateManyMutationInput.schema';
import { ServerInfoWhereInputObjectSchema } from './objects/ServerInfoWhereInput.schema';

export const ServerInfoUpdateManySchema = z.object({
  data: ServerInfoUpdateManyMutationInputObjectSchema,
  where: ServerInfoWhereInputObjectSchema.optional(),
});
