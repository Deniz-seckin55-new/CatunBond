import { z } from 'zod';
import { ServerInfoCreateInputObjectSchema } from './objects/ServerInfoCreateInput.schema';
import { ServerInfoUncheckedCreateInputObjectSchema } from './objects/ServerInfoUncheckedCreateInput.schema';

export const ServerInfoCreateOneSchema = z.object({
  data: z.union([
    ServerInfoCreateInputObjectSchema,
    ServerInfoUncheckedCreateInputObjectSchema,
  ]),
});
