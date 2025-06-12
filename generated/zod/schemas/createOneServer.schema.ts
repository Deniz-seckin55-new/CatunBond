import { z } from 'zod';
import { ServerCreateInputObjectSchema } from './objects/ServerCreateInput.schema';
import { ServerUncheckedCreateInputObjectSchema } from './objects/ServerUncheckedCreateInput.schema';

export const ServerCreateOneSchema = z.object({
  data: z.union([
    ServerCreateInputObjectSchema,
    ServerUncheckedCreateInputObjectSchema,
  ]),
});
