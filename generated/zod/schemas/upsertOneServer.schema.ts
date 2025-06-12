import { z } from 'zod';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';
import { ServerCreateInputObjectSchema } from './objects/ServerCreateInput.schema';
import { ServerUncheckedCreateInputObjectSchema } from './objects/ServerUncheckedCreateInput.schema';
import { ServerUpdateInputObjectSchema } from './objects/ServerUpdateInput.schema';
import { ServerUncheckedUpdateInputObjectSchema } from './objects/ServerUncheckedUpdateInput.schema';

export const ServerUpsertSchema = z.object({
  where: ServerWhereUniqueInputObjectSchema,
  create: z.union([
    ServerCreateInputObjectSchema,
    ServerUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ServerUpdateInputObjectSchema,
    ServerUncheckedUpdateInputObjectSchema,
  ]),
});
