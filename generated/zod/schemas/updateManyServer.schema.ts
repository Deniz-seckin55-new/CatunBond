import { z } from 'zod';
import { ServerUpdateManyMutationInputObjectSchema } from './objects/ServerUpdateManyMutationInput.schema';
import { ServerWhereInputObjectSchema } from './objects/ServerWhereInput.schema';

export const ServerUpdateManySchema = z.object({
  data: ServerUpdateManyMutationInputObjectSchema,
  where: ServerWhereInputObjectSchema.optional(),
});
