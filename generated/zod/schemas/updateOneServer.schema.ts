import { z } from 'zod';
import { ServerUpdateInputObjectSchema } from './objects/ServerUpdateInput.schema';
import { ServerUncheckedUpdateInputObjectSchema } from './objects/ServerUncheckedUpdateInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';

export const ServerUpdateOneSchema = z.object({
  data: z.union([
    ServerUpdateInputObjectSchema,
    ServerUncheckedUpdateInputObjectSchema,
  ]),
  where: ServerWhereUniqueInputObjectSchema,
});
