import { z } from 'zod';
import { ServerCreateManyInputObjectSchema } from './objects/ServerCreateManyInput.schema';

export const ServerCreateManySchema = z.object({
  data: z.union([
    ServerCreateManyInputObjectSchema,
    z.array(ServerCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
