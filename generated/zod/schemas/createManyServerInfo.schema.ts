import { z } from 'zod';
import { ServerInfoCreateManyInputObjectSchema } from './objects/ServerInfoCreateManyInput.schema';

export const ServerInfoCreateManySchema = z.object({
  data: z.union([
    ServerInfoCreateManyInputObjectSchema,
    z.array(ServerInfoCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
