import { z } from 'zod';
import { ServerListOrderElementCreateInputObjectSchema } from './objects/ServerListOrderElementCreateInput.schema';
import { ServerListOrderElementUncheckedCreateInputObjectSchema } from './objects/ServerListOrderElementUncheckedCreateInput.schema';

export const ServerListOrderElementCreateOneSchema = z.object({
  data: z.union([
    ServerListOrderElementCreateInputObjectSchema,
    ServerListOrderElementUncheckedCreateInputObjectSchema,
  ]),
});
