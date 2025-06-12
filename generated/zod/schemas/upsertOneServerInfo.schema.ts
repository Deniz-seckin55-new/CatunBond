import { z } from 'zod';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';
import { ServerInfoCreateInputObjectSchema } from './objects/ServerInfoCreateInput.schema';
import { ServerInfoUncheckedCreateInputObjectSchema } from './objects/ServerInfoUncheckedCreateInput.schema';
import { ServerInfoUpdateInputObjectSchema } from './objects/ServerInfoUpdateInput.schema';
import { ServerInfoUncheckedUpdateInputObjectSchema } from './objects/ServerInfoUncheckedUpdateInput.schema';

export const ServerInfoUpsertSchema = z.object({
  where: ServerInfoWhereUniqueInputObjectSchema,
  create: z.union([
    ServerInfoCreateInputObjectSchema,
    ServerInfoUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ServerInfoUpdateInputObjectSchema,
    ServerInfoUncheckedUpdateInputObjectSchema,
  ]),
});
