import { z } from 'zod';
import { ServerInfoUpdateInputObjectSchema } from './objects/ServerInfoUpdateInput.schema';
import { ServerInfoUncheckedUpdateInputObjectSchema } from './objects/ServerInfoUncheckedUpdateInput.schema';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';

export const ServerInfoUpdateOneSchema = z.object({
  data: z.union([
    ServerInfoUpdateInputObjectSchema,
    ServerInfoUncheckedUpdateInputObjectSchema,
  ]),
  where: ServerInfoWhereUniqueInputObjectSchema,
});
