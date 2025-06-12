import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './objects/ServerListOrderElementWhereUniqueInput.schema';

export const ServerListOrderElementFindUniqueSchema = z.object({
  where: ServerListOrderElementWhereUniqueInputObjectSchema,
});
