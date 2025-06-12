import { z } from 'zod';
import { ServerListOrderElementUpdateInputObjectSchema } from './objects/ServerListOrderElementUpdateInput.schema';
import { ServerListOrderElementUncheckedUpdateInputObjectSchema } from './objects/ServerListOrderElementUncheckedUpdateInput.schema';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';

export const ServerListOrderElementUpdateOneSchema = z.object({
  data: z.union([
    ServerListOrderElementUpdateInputObjectSchema,
    ServerListOrderElementUncheckedUpdateInputObjectSchema,
  ]),
  where: ServerListOrderElementWhereUniqueInputObjectSchema,
});
