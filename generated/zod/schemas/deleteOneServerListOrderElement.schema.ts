import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';

export const ServerListOrderElementDeleteOneSchema = z.object({
  where: ServerListOrderElementWhereUniqueInputObjectSchema,
});
