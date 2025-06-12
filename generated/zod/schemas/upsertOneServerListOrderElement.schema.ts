import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementCreateInputObjectSchema } from './objects/ServerListOrderElementCreateInput.schema';
import { ServerListOrderElementUncheckedCreateInputObjectSchema } from './objects/ServerListOrderElementUncheckedCreateInput.schema';
import { ServerListOrderElementUpdateInputObjectSchema } from './objects/ServerListOrderElementUpdateInput.schema';
import { ServerListOrderElementUncheckedUpdateInputObjectSchema } from './objects/ServerListOrderElementUncheckedUpdateInput.schema';

export const ServerListOrderElementUpsertSchema = z.object({
  where: ServerListOrderElementWhereUniqueInputObjectSchema,
  create: z.union([
    ServerListOrderElementCreateInputObjectSchema,
    ServerListOrderElementUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ServerListOrderElementUpdateInputObjectSchema,
    ServerListOrderElementUncheckedUpdateInputObjectSchema,
  ]),
});
