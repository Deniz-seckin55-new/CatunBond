import { z } from 'zod';
import { ServerListOrderElementCreateManyInputObjectSchema } from './objects/ServerListOrderElementCreateManyInput.schema';

export const ServerListOrderElementCreateManySchema = z.object({
  data: z.union([
    ServerListOrderElementCreateManyInputObjectSchema,
    z.array(ServerListOrderElementCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
